import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function init() {
  console.log('Initializing Healthcare Sales SaaS Platform...');
  
  // Check if .env file exists, if not create it
  const envPath = path.join(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) {
    const envContent = `
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/healthcare_sales
JWT_SECRET=your_jwt_secret_here
PORT=3000
DEPLOY_URL=http://localhost:3000

# AI Configuration
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
`;
    fs.writeFileSync(envPath, envContent.trim());
    console.log('Created .env file with default configuration');
  } else {
    // Check if DEPLOY_URL exists in .env file
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (!envContent.includes('DEPLOY_URL')) {
      const updatedEnvContent = envContent + '\nDEPLOY_URL=http://localhost:3000';
      fs.writeFileSync(envPath, updatedEnvContent);
      console.log('Updated .env file with DEPLOY_URL');
    }
  }
  
  // Check if migrations directory exists
  const migrationsDir = path.join(__dirname, '../../migrations');
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    console.log('Created migrations directory');
  }
  
  console.log('Initialization complete!');
  console.log('Please update the .env file with your actual configuration values.');
}

export default init;