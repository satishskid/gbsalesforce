import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';

async function createTenantCommand(orgName, planType = 'standard', maxLicenses = 10) {
  try {
    console.log(`🏢 Creating new tenant: ${orgName}`);
    
    dotenv.config();
    
    if (!process.env.DEPLOY_URL) {
      console.error('❌ DEPLOY_URL not found in .env file.');
      process.exit(1);
    }
    
    // Create organization
    const orgResponse = await axios.post(`${process.env.DEPLOY_URL}/api/createOrg`, {
      name: orgName,
      industry: 'healthcare',
      planType,
      maxLicenses
    });
    
    const org = orgResponse.data;
    
    // Create CEO user
    const ceoResponse = await axios.post(`${process.env.DEPLOY_URL}/api/createUser`, {
      orgId: org.id,
      role: 'ceo',
      name: 'CEO',
      email: `ceo@${orgName.toLowerCase().replace(/\s+/g, '')}.com`
    });
    
    const ceo = ceoResponse.data;
    
    console.log('✅ Tenant created successfully!');
    console.log(`\nOrganization Details:`);
    console.log(`- Name: ${org.name}`);
    console.log(`- ID: ${org.id}`);
    console.log(`- Plan: ${org.plan_type}`);
    console.log(`- Max Licenses: ${org.max_licenses}`);
    console.log(`- CEO User ID: ${ceo.id}`);
    
    // Generate admin license for CEO
    const adminLicense = {
      orgId: org.id,
      role: 'ceo',
      email: ceo.email,
      name: 'CEO Admin',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      id: `license_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`
    };
    
    const licenseToken = Buffer.from(JSON.stringify(adminLicense)).toString('base64');
    const adminUrl = `${process.env.DEPLOY_URL}?license=${licenseToken}`;
    
    console.log(`\nAdmin Access URL:`);
    console.log(adminUrl);
    
    // Update .env with new tenant info
    const envPath = './.env';
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    envContent += `

# New Tenant: ${orgName}
ORG_ID=${org.id}
ORG_NAME=${orgName}
ADMIN_URL=${adminUrl}`;
    fs.writeFileSync(envPath, envContent);
    
  } catch (error) {
    console.error('❌ Tenant creation failed:', error.message);
    process.exit(1);
  }
}

export { createTenantCommand };