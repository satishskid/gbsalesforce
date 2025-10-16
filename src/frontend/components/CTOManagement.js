import React, { Component } from 'react';

class CTOManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'licenses', // 'licenses', 'ai-config', 'usage', 'billing'
      licenses: [],
      aiConfigs: [],
      aiUsage: [],
      newLicense: {
        role: 'sales_rep',
        name: '',
        email: '',
        expiresDays: 30
      },
      newAiConfig: {
        provider: 'openai',
        apiKey: '',
        model: 'gpt-4-turbo'
      },
      activeTab: 'overview',
      orgId: this.props.orgId || 'org-123',
      orgMaxLicenses: this.props.orgMaxLicenses || 50,
      userId: this.props.userId || 'user-456'
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const [licenses, aiConfigs, aiUsage] = await Promise.all([
        this.fetchLicenses(),
        this.fetchAiConfigs(),
        this.fetchAiUsage()
      ]);
      
      this.setState({ licenses, aiConfigs, aiUsage });
    } catch (error) {
      console.error('Error loading CTO data:', error);
    }
  };

  fetchLicenses = async () => {
    // Mock data for demonstration
    return [
      {
        id: 'license-1',
        name: 'John Smith',
        email: 'john@company.com',
        role: 'sales_rep',
        status: 'active',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_by_name: 'Admin'
      },
      {
        id: 'license-2',
        name: 'Jane Doe',
        email: 'jane@company.com',
        role: 'manager',
        status: 'active',
        expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        created_by_name: 'Admin'
      },
      {
        id: 'license-3',
        name: 'Bob Johnson',
        email: 'bob@company.com',
        role: 'cto',
        status: 'active',
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        created_by_name: 'CEO'
      }
    ];
  };

  fetchAiConfigs = async () => {
    // Mock data for demonstration
    return [
      {
        id: 'config-1',
        provider: 'openai',
        model_name: 'gpt-4-turbo',
        is_active: true
      },
      {
        id: 'config-2',
        provider: 'anthropic',
        model_name: 'claude-3-opus',
        is_active: false
      }
    ];
  };

  fetchAiUsage = async () => {
    // Mock data for demonstration
    return [
      {
        id: 'usage-1',
        provider: 'openai',
        model: 'gpt-4-turbo',
        tokens_used: 15000,
        cost_estimate: 0.045,
        request_type: 'cme_planning'
      },
      {
        id: 'usage-2',
        provider: 'openai',
        model: 'gpt-4-turbo',
        tokens_used: 8500,
        cost_estimate: 0.025,
        request_type: 'budget_suggestion'
      },
      {
        id: 'usage-3',
        provider: 'anthropic',
        model: 'claude-3-opus',
        tokens_used: 12000,
        cost_estimate: 0.036,
        request_type: 'visit_summary'
      }
    ];
  };

  createLicense = async () => {
    const { newLicense, orgId } = this.state;
    const expiresAt = new Date(Date.now() + newLicense.expiresDays * 24 * 60 * 60 * 1000).toISOString();
    
    // In a real implementation, this would call the API
    // const response = await fetch('/.netlify/functions/createLicense', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     orgId,
    //     role: newLicense.role,
    //     name: newLicense.name,
    //     email: newLicense.email,
    //     expiresAt
    //   })
    // });
    // 
    // const license = await response.json();
    
    // Mock implementation
    const license = {
      id: `license-${Date.now()}`,
      name: newLicense.name,
      email: newLicense.email,
      role: newLicense.role,
      status: 'active',
      expires_at: expiresAt,
      created_by_name: 'Admin'
    };
    
    this.setState(prev => ({
      licenses: [license, ...prev.licenses],
      newLicense: { role: 'sales_rep', name: '', email: '', expiresDays: 30 }
    }));
    
    // Generate and show invite URL
    const licenseToken = btoa(JSON.stringify({ ...license, id: license.id }));
    const inviteUrl = `${window.location.origin}?license=${licenseToken}`;
    
    // Copy to clipboard (in a real app)
    // navigator.clipboard.writeText(inviteUrl);
    alert(`License created! Invite URL: ${inviteUrl}`);
  };

  saveAiConfig = async () => {
    const { newAiConfig, orgId } = this.state;
    
    // Hash the API key for storage (in production, use proper encryption)
    const apiKeyHash = btoa(newAiConfig.apiKey);
    
    // In a real implementation, this would call the API
    // const response = await fetch('/.netlify/functions/saveAiConfig', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     orgId,
    //     provider: newAiConfig.provider,
    //     apiKeyHash,
    //     model: newAiConfig.model,
    //     userId: this.props.userId
    //   })
    // });
    // 
    // const updatedConfig = await response.json();
    
    // Mock implementation
    const updatedConfig = {
      id: `config-${newAiConfig.provider}`,
      provider: newAiConfig.provider,
      model_name: newAiConfig.model,
      is_active: true
    };
    
    this.setState(prev => ({
      aiConfigs: prev.aiConfigs.map(config => 
        config.provider === updatedConfig.provider ? updatedConfig : config
      ),
      newAiConfig: { ...prev.newAiConfig, apiKey: '' }
    }));
    
    alert('AI configuration saved successfully!');
  };

  testAiConnection = async (provider) => {
    try {
      // In a real implementation, this would call the API
      // const response = await fetch('/.netlify/functions/aiProxy', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'x-api-key': 'test-key' // This would be the actual key in production
      //   },
      //   body: JSON.stringify({
      //     orgId: this.props.orgId,
      //     userId: this.props.userId,
      //     provider,
      //     model: this.state.aiConfigs.find(c => c.provider === provider)?.model_name || 'gpt-4-turbo',
      //     messages: [{ role: 'user', content: 'Hello, are you working?' }],
      //     requestType: 'test'
      //   })
      // });
      
      // if (response.ok) {
      //   alert(`✅ ${provider} connection successful!`);
      // } else {
      //   throw new Error('Connection failed');
      // }
      
      // Mock implementation
      alert(`✅ ${provider} connection successful!`);
    } catch (error) {
      alert(`❌ ${provider} connection failed: ${error.message}`);
    }
  };

  renderLicenseManagement() {
    const { licenses, newLicense } = this.state;
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">License Management</h2>
          <p className="text-blue-100">Manage your team's access and permissions</p>
        </div>

        {/* License Creation Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Create New License</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">User Name</label>
              <input
                type="text"
                value={newLicense.name}
                onChange={(e) => this.setState({ newLicense: { ...newLicense, name: e.target.value } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user's name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email (Optional)</label>
              <input
                type="email"
                value={newLicense.email}
                onChange={(e) => this.setState({ newLicense: { ...newLicense, email: e.target.value } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="user@company.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={newLicense.role}
                onChange={(e) => this.setState({ newLicense: { ...newLicense, role: e.target.value } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="sales_rep">Sales Representative</option>
                <option value="manager">Sales Manager</option>
                <option value="cto">CTO</option>
                <option value="ceo">CEO</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Expiration (Days)</label>
              <select
                value={newLicense.expiresDays}
                onChange={(e) => this.setState({ newLicense: { ...newLicense, expiresDays: parseInt(e.target.value) } })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={this.createLicense}
            disabled={!newLicense.name}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            Create License & Generate Invite URL
          </button>
        </div>

        {/* Active Licenses */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Active Licenses ({licenses.length})</h3>
            <div className="text-sm text-gray-600">
              Plan Limit: {this.state.orgMaxLicenses} licenses
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">User</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Role</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Expires</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Created By</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {licenses.map(license => (
                  <tr key={license.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium">{license.name}</div>
                      {license.email && <div className="text-sm text-gray-600">{license.email}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        license.role === 'ceo' ? 'bg-red-100 text-red-800' :
                        license.role === 'cto' ? 'bg-purple-100 text-purple-800' :
                        license.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {license.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        license.status === 'active' ? 'bg-green-100 text-green-800' :
                        license.status === 'expired' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(license.expires_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {license.created_by_name || 'System'}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-red-600 hover:text-red-800 mr-2">
                        <i className="fas fa-trash"></i>
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderAIConfiguration() {
    const { aiConfigs, newAiConfig } = this.state;
    
    const aiProviders = [
      { id: 'openai', name: 'OpenAI', models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'] },
      { id: 'anthropic', name: 'Anthropic', models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'] },
      { id: 'google', name: 'Google', models: ['gemini-pro', 'gemini-1.5-pro'] },
      { id: 'mistral', name: 'Mistral', models: ['mistral-large', 'mistral-medium', 'mistral-small'] }
    ];
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">AI Configuration (BYOK)</h2>
          <p className="text-purple-100">Bring Your Own API Keys for AI Integration</p>
        </div>

        {/* AI Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiProviders.map(provider => {
            const config = aiConfigs.find(c => c.provider === provider.id);
            const isActive = config?.is_active;
            
            return (
              <div key={provider.id} className={`border-2 rounded-lg p-4 transition-all ${
                isActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{provider.name}</h3>
                  {isActive && <i className="fas fa-check-circle text-green-600"></i>}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">API Key</label>
                    <input
                      type="password"
                      value={newAiConfig.provider === provider.id ? newAiConfig.apiKey : ''}
                      onChange={(e) => this.setState({ 
                        newAiConfig: { ...newAiConfig, apiKey: e.target.value, provider: provider.id } 
                      })}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Enter your API key"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Model</label>
                    <select
                      value={config?.model_name || provider.models[0]}
                      onChange={(e) => this.setState({ 
                        newAiConfig: { ...newAiConfig, model: e.target.value, provider: provider.id } 
                      })}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                      {provider.models.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => this.saveAiConfig()}
                      className="flex-1 bg-purple-600 text-white py-2 rounded text-sm font-semibold"
                    >
                      {isActive ? 'Update' : 'Save'}
                    </button>
                    <button
                      onClick={() => this.testAiConnection(provider.id)}
                      className="px-3 bg-gray-200 text-gray-700 rounded text-sm"
                    >
                      <i className="fas fa-plug"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Usage Analytics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">AI Usage Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {this.state.aiUsage.length}
              </div>
              <div className="text-sm text-gray-600">Total API Calls</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {this.state.aiUsage.reduce((sum, usage) => sum + usage.tokens_used, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Tokens Used</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Object.keys(this.state.aiUsage.reduce((providers, usage) => {
                  providers[usage.provider] = (providers[usage.provider] || 0) + 1;
                  return providers;
                }, {})).length}
              </div>
              <div className="text-sm text-gray-600">Providers Used</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUsageAnalytics() {
    const { aiUsage } = this.state;
    
    // Group usage by provider
    const usageByProvider = aiUsage.reduce((acc, usage) => {
      if (!acc[usage.provider]) {
        acc[usage.provider] = { tokens: 0, cost: 0, count: 0 };
      }
      acc[usage.provider].tokens += usage.tokens_used;
      acc[usage.provider].cost += usage.cost_estimate;
      acc[usage.provider].count += 1;
      return acc;
    }, {});
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Usage Analytics</h2>
          <p className="text-green-100">Track your AI usage and costs</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{aiUsage.length}</div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {aiUsage.reduce((sum, usage) => sum + usage.tokens_used, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Tokens Used</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              ${aiUsage.reduce((sum, usage) => sum + usage.cost_estimate, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Estimated Cost</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {Object.keys(usageByProvider).length}
            </div>
            <div className="text-sm text-gray-600">AI Providers</div>
          </div>
        </div>

        {/* Usage by Provider */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Usage by Provider</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Provider</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Requests</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Tokens</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Cost</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Avg. Tokens/Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(usageByProvider).map(([provider, data]) => (
                  <tr key={provider}>
                    <td className="px-4 py-3 font-medium">{provider}</td>
                    <td className="px-4 py-3">{data.count}</td>
                    <td className="px-4 py-3">{data.tokens.toLocaleString()}</td>
                    <td className="px-4 py-3">${data.cost.toFixed(2)}</td>
                    <td className="px-4 py-3">{Math.round(data.tokens / data.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Usage */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Recent AI Usage</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Provider</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Model</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Request Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Tokens</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Cost</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {aiUsage.map(usage => (
                  <tr key={usage.id}>
                    <td className="px-4 py-3">{usage.provider}</td>
                    <td className="px-4 py-3">{usage.model}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {usage.request_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{usage.tokens_used.toLocaleString()}</td>
                    <td className="px-4 py-3">${usage.cost_estimate.toFixed(4)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Just now</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderBillingManagement() {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Billing & Plans</h2>
          <p className="text-orange-100">Manage your subscription and billing information</p>
        </div>

        {/* Current Plan */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Current Plan</h3>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-bold text-lg">Enterprise Plan</h4>
              <p className="text-gray-600">Best for large teams and organizations</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$299<span className="text-lg">/month</span></div>
              <p className="text-gray-600">Billed annually</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">50</div>
              <div className="text-sm text-gray-600">Licenses</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Unlimited</div>
              <div className="text-sm text-gray-600">AI Requests</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* License Usage */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">License Usage</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">3 of 50 licenses used</span>
            <span className="font-medium">6%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '6%'}}></div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Need more licenses? <a href="#" className="text-blue-600 hover:underline">Upgrade your plan</a>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Payment Method</h3>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <div className="mr-4 text-2xl">💳</div>
            <div className="flex-1">
              <div className="font-medium">Visa ending in 4242</div>
              <div className="text-sm text-gray-600">Expires 12/2025</div>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <i className="fas fa-edit mr-1"></i> Edit
            </button>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Billing History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Description</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Jun 1, 2023</td>
                  <td className="px-4 py-3">Enterprise Plan (May 2023)</td>
                  <td className="px-4 py-3">$299.00</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">May 1, 2023</td>
                  <td className="px-4 py-3">Enterprise Plan (Apr 2023)</td>
                  <td className="px-4 py-3">$299.00</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { currentView } = this.state;
    
    return (
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => this.setState({ currentView: 'licenses' })}
            className={`px-4 py-2 font-medium text-sm ${
              currentView === 'licenses' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fas fa-key mr-2"></i>
            License Management
          </button>
          <button
            onClick={() => this.setState({ currentView: 'ai-config' })}
            className={`px-4 py-2 font-medium text-sm ${
              currentView === 'ai-config' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fas fa-robot mr-2"></i>
            AI Configuration (BYOK)
          </button>
          <button
            onClick={() => this.setState({ currentView: 'usage' })}
            className={`px-4 py-2 font-medium text-sm ${
              currentView === 'usage' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fas fa-chart-bar mr-2"></i>
            Usage Analytics
          </button>
          <button
            onClick={() => this.setState({ currentView: 'billing' })}
            className={`px-4 py-2 font-medium text-sm ${
              currentView === 'billing' 
                ? 'text-orange-600 border-b-2 border-orange-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fas fa-credit-card mr-2"></i>
            Billing & Plans
          </button>
        </div>

        {/* Content */}
        {currentView === 'licenses' && this.renderLicenseManagement()}
        {currentView === 'ai-config' && this.renderAIConfiguration()}
        {currentView === 'usage' && this.renderUsageAnalytics()}
        {currentView === 'billing' && this.renderBillingManagement()}
      </div>
    );
  }
}

export default CTOManagement;