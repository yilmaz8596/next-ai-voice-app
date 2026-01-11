import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const psql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: psql });

export { db };