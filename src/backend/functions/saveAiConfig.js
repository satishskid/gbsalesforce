// Netlify function to save AI configuration
import { query } from '../lib/db.js';
import bcrypt from 'bcryptjs';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { orgId, provider, apiKeyHash, model, userId } = JSON.parse(event.body);

    // Validate required fields
    if (!orgId || !provider || !apiKeyHash || !model) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID, provider, API key, and model are required' })
      };
    }

    // Check if config already exists for this provider
    const existingConfig = await query(
      'SELECT id FROM ai_configurations WHERE org_id = $1 AND provider = $2',
      [orgId, provider]
    );

    let result;
    if (existingConfig.rows.length > 0) {
      // Update existing config
      result = await query(
        `UPDATE ai_configurations 
         SET api_key_hash = $1, model_name = $2, is_active = true, created_by = $3, updated_at = NOW()
         WHERE org_id = $4 AND provider = $5
         RETURNING *`,
        [apiKeyHash, model, userId, orgId, provider]
      );
    } else {
      // Insert new config
      result = await query(
        `INSERT INTO ai_configurations (org_id, provider, api_key_hash, model_name, created_by)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [orgId, provider, apiKeyHash, model, userId]
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'AI configuration saved successfully',
        config: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Error saving AI configuration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save AI configuration' })
    };
  }
};

export { handler };
export default { handler };