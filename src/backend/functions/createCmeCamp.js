// Netlify function to create a new CME camp
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { org_id, name, start_date, end_date, location, expected_attendees, created_by } = JSON.parse(event.body);

    // Validate required fields
    if (!org_id || !name || !start_date || !end_date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID, name, start date, and end date are required' })
      };
    }

    // Insert CME camp into database
    const result = await query(
      `INSERT INTO cme_camps (org_id, name, start_date, end_date, location, expected_attendees, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [org_id, name, start_date, end_date, location, expected_attendees, created_by]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'CME camp created successfully',
        cmeCamp: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error creating CME camp:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create CME camp' })
    };
  }
};

export { handler };
export default { handler };