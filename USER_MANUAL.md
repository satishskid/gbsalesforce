# sales4ce User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [CLI Commands](#cli-commands)
4. [Web Interface](#web-interface)
5. [Managing Tenants](#managing-tenants)
6. [License Management](#license-management)
7. [CME Camp Management](#cme-camp-management)
8. [AI Integration](#ai-integration)
9. [Troubleshooting](#troubleshooting)
10. [Support](#support)

## Introduction

Welcome to sales4ce, a comprehensive SaaS platform designed specifically for healthcare sales teams. This platform provides tools for organization management, licensing, CME camp planning, and AI-powered insights to help your sales team succeed in the competitive healthcare market.

### Key Features
- Multi-tenant organization management
- Role-based licensing system
- CME camp planning and management
- AI integration with Bring Your Own Key (BYOK) model
- Role-based access control (CEO, CTO, Manager, Sales Rep)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Netlify account (for deployment)
- API keys for AI services (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/satishskid/gbsalesforce.git
   cd gbsalesforce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/healthcare_sales
   JWT_SECRET=your_jwt_secret_here
   PORT=3000
   DEPLOY_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_api_key_here (optional)
   ANTHROPIC_API_KEY=your_anthropic_api_key_here (optional)
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## CLI Commands

The sales4ce platform includes a powerful command-line interface for managing your installation.

### Initialize the Platform
```bash
sales4ce init
```
Sets up the initial configuration and environment files.

### Deploy to Netlify
```bash
sales4ce deploy
```
Deploys the application to Netlify.

### Create a Tenant Organization
```bash
sales4ce create-tenant <orgName> [options]
```
Options:
- `-p, --plan <plan>` - Plan type (basic, standard, enterprise) (default: "standard")
- `-m, --max-licenses <number>` - Maximum number of licenses (default: "10")

Example:
```bash
sales4ce create-tenant "Acme Healthcare" --plan enterprise --max-licenses 25
```

### Manage Licenses
List licenses for an organization:
```bash
sales4ce licenses:list <orgId>
```

Create a new license:
```bash
sales4ce licenses:create <orgId> <role> <name> [options]
```
Options:
- `-e, --email <email>` - Email address
- `-d, --days <days>` - Expiration in days (default: "30")

Example:
```bash
sales4ce licenses:create org-123 sales_rep "John Smith" --email john@example.com --days 90
```

Revoke a license:
```bash
sales4ce licenses:revoke <orgId> <licenseId>
```

### Apply Database Migrations
```bash
sales4ce migrate
```

## Web Interface

The sales4ce web interface provides a dashboard for managing your organization's activities.

### Accessing the Dashboard
After deployment, access your dashboard at your Netlify URL. Use the invite URLs generated when creating licenses to access specific roles.

### Navigation
The main navigation includes:
- Dashboard: Overview of organizational metrics
- Licensing: Manage user licenses
- CME Camps: Plan and manage CME events
- AI Integration: Configure and use AI features

## Managing Tenants

### Creating a Tenant
Use the CLI to create a new tenant organization:
```bash
sales4ce create-tenant "Organization Name" --plan enterprise --max-licenses 50
```

This command creates:
1. An organization record in the database
2. A CEO user account
3. An admin access URL for the CEO

### Tenant Information
After creating a tenant, the system provides:
- Organization ID
- Admin access URL
- Default CEO user credentials

## License Management

### Creating Licenses
Create licenses for team members with specific roles and expiration dates:
```bash
sales4ce licenses:create <orgId> <role> <name> --email user@example.com --days 90
```

Available roles:
- `ceo`: Chief Executive Officer
- `cto`: Chief Technology Officer
- `manager`: Sales Manager
- `sales_rep`: Sales Representative

### Distributing Licenses
Each license creation generates a unique invite URL that can be sent to the user. This URL contains an encoded token with the license information.

### Managing Licenses
View all licenses for an organization:
```bash
sales4ce licenses:list <orgId>
```

Revoke a license when no longer needed:
```bash
sales4ce licenses:revoke <orgId> <licenseId>
```

## CME Camp Management

The CME (Continuing Medical Education) camp management feature allows you to:
- Plan and schedule CME events
- Track attendance
- Manage content and materials
- Generate reports

### Creating a CME Camp
Use the web interface to create a new CME camp by providing:
- Camp name and description
- Dates and location
- Target audience
- Agenda and speakers

### Managing Camp Details
- Add/remove attendees
- Upload materials and resources
- Track completion status
- Generate attendance certificates

## AI Integration

The platform supports AI integration with a Bring Your Own Key (BYOK) model, allowing you to use your own API keys for:
- OpenAI GPT models
- Anthropic Claude models

### Configuration
Set your API keys in the environment variables:
```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Features
- AI-powered sales insights
- Customer interaction analysis
- Market trend predictions
- Personalized recommendations

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check your DATABASE_URL in the .env file
   - Ensure your PostgreSQL server is running
   - Verify database credentials

2. **CLI Commands Not Found**
   - Ensure you've installed the package globally: `npm install -g .`
   - Check your PATH environment variable

3. **Deployment Errors**
   - Verify your Netlify account credentials
   - Check that your environment variables are set correctly in Netlify

4. **License Creation Fails**
   - Verify the organization ID exists
   - Check that you haven't exceeded the maximum license count

### Getting Logs
For detailed error information, check the console output or Netlify function logs.

## Support

For support, please:
1. Check the troubleshooting section above
2. Review the GitHub issues: https://github.com/satishskid/gbsalesforce/issues
3. Contact the development team at support@sales4ce.com

### Reporting Issues
When reporting issues, please include:
- Error messages
- Steps to reproduce
- Environment information (Node.js version, OS, etc.)
- Screenshots if applicable