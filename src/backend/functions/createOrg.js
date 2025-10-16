// Netlify function to create a new organization
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { name, industry, plan_type, max_licenses } = JSON.parse(event.body);

    // Validate required fields
    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization name is required' })
      };
    }

    // Insert organization into database
    const result = await query(
      'INSERT INTO organizations (name, industry, plan_type, max_licenses) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, industry || 'healthcare', plan_type || 'standard', max_licenses || 10]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Organization created successfully',
        organization: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error creating organization:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create organization' })
    };
  }
};

export { handler };
export default { handler };