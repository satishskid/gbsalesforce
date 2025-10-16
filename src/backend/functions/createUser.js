// Netlify function to create a new user
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { org_id, role, name, email } = JSON.parse(event.body);

    // Validate required fields
    if (!org_id || !role || !name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID, role, and name are required' })
      };
    }

    // Insert user into database
    const result = await query(
      'INSERT INTO users (org_id, role, name, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [org_id, role, name, email]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User created successfully',
        user: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create user' })
    };
  }
};

export { handler };
export default { handler };