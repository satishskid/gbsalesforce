# gbsales4ce

A comprehensive SaaS platform for healthcare sales teams with AI-powered insights and CME camp management.

## Features

- Organization/Tenant Management
- License Management
- CME Camp Planning and Management
- AI Integration (Bring Your Own Key)
- Role-based Access Control (CEO, CTO, Manager, Sales Rep)

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Database: PostgreSQL
- Deployment: Netlify
- Authentication: JWT

## Project Structure

```
gbsales4ce/
├── src/
│   ├── frontend/
│   │   ├── components/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── CTOManagement.js
│   │   │   ├── Licensing.js
│   │   │   ├── CmeCampManagement.js
│   │   │   └── AIIntegration.js
│   │   ├── App.js
│   │   └── styles.css
│   └── backend/
│       ├── functions/
│       │   ├── createOrg.js
│       │   ├── createLicense.js
│       │   ├── activateLicense.js
│       │   ├── createCmeCamp.js
│       │   └── aiProxy.js
│       └── lib/
│           └── db.js
├── cli/
│   ├── commands/
│   │   ├── init.js
│   │   ├── deploy.js
│   │   ├── createTenant.js
│   │   └── manageLicenses.js
│   └── index.js
├── migrations/
│   └── 001-complete-schema.sql
├── package.json
├── netlify.toml
└── README.md
```

## Database Schema

The database schema is defined in [migrations/001-complete-schema.sql](migrations/001-complete-schema.sql).

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Netlify account (for deployment)

### Step 1: Install and Initialize

```bash
# Install globally
npm install -g gbsales4ce

# Initialize project
gbsales4ce init
```

### Step 2: Configure Environment Variables

After initialization, update the `.env` file with your actual configuration values:

```
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/healthcare_sales
JWT_SECRET=your_strong_jwt_secret_here
PORT=3000
DEPLOY_URL=http://localhost:3000

# AI Configuration (optional)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Set up the Database

```bash
# Run database migrations
npm run migrate
```

## Development

Start the development server:

```bash
npm run dev
```

## Deployment

### Manual Deployment Steps

```bash
# Build the frontend application
npm run build

# Run database migrations (if needed)
npm run migrate

# Deploy to Netlify
netlify deploy
```

### Using the CLI

```bash
# Deploy using the built-in CLI command
gbsales4ce deploy
```

### Netlify Configuration

1. Connect your GitHub repository to Netlify
2. Set the build command to: `npm run build`
3. Set the publish directory to: `dist/`
4. Add environment variables in Netlify dashboard:
   - DATABASE_URL
   - JWT_SECRET
   - DEPLOY_URL
   - OPENAI_API_KEY (optional)
   - ANTHROPIC_API_KEY (optional)

## CLI Commands

- Initialize project: `gbsales4ce init`
- Deploy: `gbsales4ce deploy`
- Create tenant: `gbsales4ce create-tenant <orgName>`
- List licenses: `gbsales4ce licenses:list <orgId>`
- Create license: `gbsales4ce licenses:create <orgId> <role> <name>`
- Revoke license: `gbsales4ce licenses:revoke <orgId> <licenseId>`
- Apply migrations: `gbsales4ce migrate`

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Set up the database:
   ```
   npm run migrate
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/healthcare_sales
JWT_SECRET=your_jwt_secret
PORT=3000
```