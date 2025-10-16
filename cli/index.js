#!/usr/bin/env node

import { program } from 'commander';
import initCommand from './commands/init.js';
import deployCommand from './commands/deploy.js';
import { createTenantCommand } from './commands/createTenant.js';
import { listLicenses, createLicense, revokeLicense } from './commands/manageLicenses.js';
import { migrateCommand } from './commands/migrate.js';

program
  .name('sales4ce')
  .description('CLI for Healthcare Sales SaaS Management')
  .version('2.0.0');

// Core commands
program
  .command('init')
  .description('Initialize the Healthcare Sales SaaS project')
  .action(initCommand);

program
  .command('deploy')
  .description('Deploy to Netlify')
  .action(deployCommand);

// Tenant management
program
  .command('create-tenant <orgName>')
  .description('Create a new tenant organization')
  .option('-p, --plan <plan>', 'Plan type (basic, standard, enterprise)', 'standard')
  .option('-m, --max-licenses <number>', 'Maximum number of licenses', '10')
  .action((orgName, options) => createTenantCommand(orgName, options.plan, parseInt(options.maxLicenses)));

// License management
program
  .command('licenses:list <orgId>')
  .description('List all licenses for an organization')
  .action(listLicenses);

program
  .command('licenses:create <orgId> <role> <name>')
  .description('Create a new license')
  .option('-e, --email <email>', 'Email address')
  .option('-d, --days <days>', 'Expiration in days', '30')
  .action((orgId, role, name, options) => 
    createLicense(orgId, role, name, options.email, parseInt(options.days))
  );

program
  .command('licenses:revoke <orgId> <licenseId>')
  .description('Revoke a license')
  .action(revokeLicense);

program
  .command('migrate')
  .description('Apply database migrations')
  .action(migrateCommand);

program.parse();