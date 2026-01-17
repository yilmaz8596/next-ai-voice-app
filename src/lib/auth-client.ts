import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth/client";
export const authClient = createAuthClient({
  plugins: [polarClient()],
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000",
});
