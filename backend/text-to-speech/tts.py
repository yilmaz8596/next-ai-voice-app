import io 
import os 
from typing import Optional 
import uuid 

import modal 
from pydantic import BaseModel

app = modal.App("voxio-ai-voice-studio")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "numpy==1.26.0",
        "torch==2.6.0")
    .pip_install_from_requirements("backend/text-to-speech/requirements.txt")
    .apt_install("ffmpeg")
)

volume = modal.Volume.from_name("hf-cache-voxio-ai-voice-studio",create_if_missing=True)

s3_secret = modal.Secret.from_name("voxio-ai-voice-studio-aws-secret")

class TTSRequest(BaseModel):
    text: str 
    voice_s3_key: Optional[str] = None
    language: str = "en"
    exaggeration: float = 0.5
    cfg_weight: float = 0.5
    

class TTSResponse(BaseModel): 
    s3_Key:str 
    
@app.cls(
    image=image,
    volumes={ "/root/.cache/huggingface": volume, 
             "/s3-mount":modal.CloudBucketMount("voxio-ai-voice-studio",    secret=s3_secret,
 )},
    scaledown_window=120,
    secrets=[s3_secret],
    gpu="L4",
)
class TextToSpeechServer:
    @modal.enter()
    def load_modal(self):
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS 
        self.model = ChatterboxMultilingualTTS.from_pretrained(device="cuda")

    @modal.fastapi_endpoint(method="POST", requires_proxy_auth=True)
    def generate_speech(self, request: TTSRequest) -> TTSResponse:
        import torch
        import torchaudio
        with torch.no_grad():
            if request.voice_s3_key:
                audio_prompt_path = f"/s3-mount/{request.voice_s3_key}"
            
                if not os.path.exists(audio_prompt_path):
                  raise FileNotFoundError(f"Audio prompt not found at {audio_prompt_path}")
                wav = self.model.generate(
                 request.text,
                 language_id=request.language,
                 exaggeration=request.exaggeration,
                 audio_prompt_path=audio_prompt_path,
                 cfg_weight=request.cfg_weight)
            
            else:
                wav = self.model.generate(
                 request.text,
                 language_id=request.language,
                 exaggeration=request.exaggeration,
                 cfg_weight=request.cfg_weight)
            
            wav_cpu = wav.cpu()
            
        buffer = io.BytesIO()
        torchaudio.save(buffer, wav_cpu, self.model.sr, format="wav")
        buffer.seek(0)
        audio_bytes = buffer.read()
        
        audio_uuid = str(uuid.uuid4())
        s3_key = f"tts/{audio_uuid}.wav"
        
        s3_path = f"/s3-mount/{s3_key}"
        os.makedirs(os.path.dirname(s3_path), exist_ok=True)
        with open(s3_path, "wb") as f:
            f.write(audio_bytes)
        print(f"Saved generated audio to {s3_path}")
        return TTSResponse(s3_Key=s3_key)