import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env');

console.log(`Loading .env from: ${envPath}`);
dotenv.config({ path: envPath });

console.log('Environment variables:');
console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✓ Set' : '✗ Not set'}`);

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

async function testConnection() {
  console.log('\nTesting database connection...');
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT NOW()`;
    console.log('✅ Connection successful!');
    console.log(`Server time: ${result[0].now}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    process.exit(1);
  }
}

testConnection().catch(console.error);
