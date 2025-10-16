import axios from 'axios';
import dotenv from 'dotenv';

async function listLicenses(orgId) {
  try {
    dotenv.config();
    
    const response = await axios.get(`${process.env.DEPLOY_URL}/api/listLicenses?org_id=${orgId}`);
    const licenses = response.data;
    
    console.log('\n📋 Active Licenses:');
    console.table(licenses.map(license => ({
      'ID': license.id.substring(0, 8) + '...',
      'Role': license.role,
      'Name': license.name,
      'Email': license.email || 'N/A',
      'Status': license.status,
      'Expires': new Date(license.expires_at).toLocaleDateString(),
      'Created By': license.created_by_name || 'System'
    })));
    
  } catch (error) {
    console.error('❌ Failed to list licenses:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    process.exit(1);
  }
}

async function createLicense(orgId, role, name, email, expiresDays = 30) {
  try {
    dotenv.config();
    
    const expiresAt = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000).toISOString();
    
    const response = await axios.post(`${process.env.DEPLOY_URL}/api/createLicense`, {
      org_id: orgId,
      role,
      name,
      email,
      expires_at: expiresAt
    });
    
    const license = response.data.license;
    const licenseToken = Buffer.from(JSON.stringify({
      ...license,
      id: license.id
    })).toString('base64');
    
    const inviteUrl = `${process.env.DEPLOY_URL}?license=${licenseToken}`;
    
    console.log('✅ License created successfully!');
    console.log(`\nInvite URL for ${name} (${role}):`);
    console.log(inviteUrl);
    
    return inviteUrl;
  } catch (error) {
    console.error('❌ License creation failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    process.exit(1);
  }
}

async function revokeLicense(orgId, licenseId) {
  try {
    dotenv.config();
    
    await axios.post(`${process.env.DEPLOY_URL}/api/revokeLicense`, {
      org_id: orgId,
      license_id: licenseId
    });
    
    console.log('✅ License revoked successfully!');
  } catch (error) {
    console.error('❌ License revocation failed:', error.message);
    process.exit(1);
  }
}

export { listLicenses, createLicense, revokeLicense };