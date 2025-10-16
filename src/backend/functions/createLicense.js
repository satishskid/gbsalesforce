// Netlify function to create a new license
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { org_id, role, name, email, expires_at, created_by } = JSON.parse(event.body);

    // Validate required fields
    if (!org_id || !role || !name || !expires_at) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID, role, name, and expiration date are required' })
      };
    }

    // Insert license into database
    const result = await query(
      `INSERT INTO licenses (org_id, role, name, email, expires_at, created_by, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [org_id, role, name, email, expires_at, created_by, 'pending']
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'License created successfully',
        license: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error creating license:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create license' })
    };
  }
};

export { handler };
export default { handler };