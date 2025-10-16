// Netlify function to list licenses for an organization
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { orgId } = event.queryStringParameters || {};

    // Validate required fields
    if (!orgId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID is required' })
      };
    }

    // Get licenses from database
    const result = await query(
      `SELECT l.*, u.name as created_by_name 
       FROM licenses l 
       LEFT JOIN users u ON l.created_by = u.id 
       WHERE l.org_id = $1 
       ORDER BY l.created_at DESC`,
      [orgId]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (error) {
    console.error('Error listing licenses:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to list licenses' })
    };
  }
};

export { handler };
export default { handler };