// Netlify function to activate a license
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { license_id, activated_by } = JSON.parse(event.body);

    // Validate required fields
    if (!license_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'License ID is required' })
      };
    }

    // Update license status to active
    const result = await query(
      `UPDATE licenses 
       SET status = $1, activated_by = $2, activation_date = NOW() 
       WHERE id = $3 RETURNING *`,
      ['active', activated_by, license_id]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'License not found' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'License activated successfully',
        license: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error activating license:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to activate license' })
    };
  }
};

export { handler };
export default { handler };