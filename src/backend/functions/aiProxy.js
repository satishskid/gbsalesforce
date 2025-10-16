// Netlify function to proxy AI requests
import { query } from '../lib/db.js';

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { org_id, user_id, prompt, request_type } = JSON.parse(event.body);

    // Validate required fields
    if (!org_id || !prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Organization ID and prompt are required' })
      };
    }

    // In a real implementation, you would:
    // 1. Retrieve the organization's AI configuration
    // 2. Call the appropriate AI provider API
    // 3. Return the response
    
    // For this example, we'll simulate an AI response
    const simulatedResponse = {
      id: 'simulated-' + Date.now(),
      object: 'text_completion',
      created: Math.floor(Date.now() / 1000),
      model: 'gpt-4',
      choices: [
        {
          text: `\n\nThis is a simulated response to your prompt: "${prompt}". In a real implementation, this would connect to your configured AI provider.`,
          index: 0,
          logprobs: null,
          finish_reason: 'stop'
        }
      ]
    };
    
    // Log the AI usage
    const tokensUsed = prompt.split(' ').length * 1.3; // Rough estimation
    const costEstimate = tokensUsed * 0.00003; // Approximate cost
    
    await query(
      `INSERT INTO ai_usage_logs (org_id, user_id, provider, model, tokens_used, cost_estimate, request_type) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [org_id, user_id, 'openai', 'gpt-4', Math.round(tokensUsed), costEstimate.toFixed(6), request_type || 'general']
    );

    return {
      statusCode: 200,
      body: JSON.stringify(simulatedResponse)
    };
  } catch (error) {
    console.error('Error processing AI request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process AI request' })
    };
  }
};

export { handler };
export default { handler };