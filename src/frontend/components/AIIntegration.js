import React, { useState } from 'react';

const AIIntegration = () => {
  const [aiUsageLogs, setAiUsageLogs] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    
    // In a real app, this would call an API
    // const res = await fetch('/api/ai-proxy', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt })
    // });
    // const data = await res.json();
    
    // Mock implementation
    setTimeout(() => {
      const mockResponse = `This is a simulated AI response to your prompt: "${prompt}". In a real implementation, this would connect to your configured AI provider.`;
      setResponse(mockResponse);
      
      // Add to usage logs
      const newLog = {
        id: Date.now(),
        provider: 'openai',
        model: 'gpt-4',
        tokensUsed: Math.floor(Math.random() * 1000) + 100,
        costEstimate: (Math.random() * 0.01).toFixed(6),
        requestType: 'cme_planning',
        createdAt: new Date().toISOString()
      };
      
      setAiUsageLogs(prev => [newLog, ...prev]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h2>AI Integration</h2>
      
      <section>
        <h3>AI Assistant</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your prompt:
            <textarea 
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Ask anything related to healthcare sales, CME planning, budget suggestions, etc."
              rows="4"
              style={{ width: '100%', maxWidth: '600px' }}
            />
          </label>
          <br />
          <button type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        
        {response && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '4px' }}>
            <h4>AI Response:</h4>
            <p>{response}</p>
          </div>
        )}
      </section>
      
      <section>
        <h3>AI Usage Logs</h3>
        {aiUsageLogs.length === 0 ? (
          <p>No AI usage logs found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Model</th>
                <th>Tokens Used</th>
                <th>Cost Estimate</th>
                <th>Request Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {aiUsageLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.provider}</td>
                  <td>{log.model}</td>
                  <td>{log.tokensUsed}</td>
                  <td>${log.costEstimate}</td>
                  <td>{log.requestType}</td>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AIIntegration;