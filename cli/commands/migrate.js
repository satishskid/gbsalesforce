import { exec } from 'child_process';

export function migrateCommand() {
  const dbUrl = 'postgresql://neondb_owner:npg_z3ohawN6OWFY@ep-royal-math-adi28caj-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
  exec(`DATABASE_URL=${dbUrl} npm run migrate`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}