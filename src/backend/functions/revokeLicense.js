// Netlify function to revoke a license
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { org_id, license_id } = JSON.parse(event.body);

    // Validate required fields
    if (!org_id || !license_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID and License ID are required' })
      };
    }

    // Update license status to revoked
    const result = await query(
      `UPDATE licenses 
       SET status = $1 
       WHERE id = $2 AND org_id = $3 
       RETURNING *`,
      ['revoked', license_id, org_id]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'License not found or does not belong to this organization' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'License revoked successfully',
        license: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error revoking license:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to revoke license' })
    };
  }
};

export { handler };
export default { handler };