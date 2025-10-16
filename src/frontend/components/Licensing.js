import React, { useState } from 'react';

const Licensing = () => {
  const [licenses, setLicenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    role: 'sales_rep',
    name: '',
    email: '',
    expiresAt: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to an API
    // fetch('/api/licenses', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    
    // Mock implementation
    const newLicense = {
      id: Date.now(),
      role: formData.role,
      name: formData.name,
      email: formData.email,
      expiresAt: formData.expiresAt,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    setLicenses(prev => [...prev, newLicense]);
    setFormData({ role: 'sales_rep', name: '', email: '', expiresAt: '' });
    setShowForm(false);
  };

  const activateLicense = (id) => {
    setLicenses(prev => prev.map(license => 
      license.id === id ? { ...license, status: 'active' } : license
    ));
  };

  const revokeLicense = (id) => {
    setLicenses(prev => prev.map(license => 
      license.id === id ? { ...license, status: 'revoked' } : license
    ));
  };

  return (
    <div>
      <h2>Licensing Management</h2>
      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New License'}
      </button>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>Create New License</h3>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleInputChange}>
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
              <option value="manager">Manager</option>
              <option value="sales_rep">Sales Representative</option>
            </select>
          </label>
          
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <label>
            Expiration Date:
            <input 
              type="date" 
              name="expiresAt" 
              value={formData.expiresAt} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <button type="submit">Create License</button>
        </form>
      )}
      
      <section>
        <h3>Active Licenses</h3>
        {licenses.length === 0 ? (
          <p>No licenses found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Expires At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map(license => (
                <tr key={license.id}>
                  <td>{license.name}</td>
                  <td>{license.email}</td>
                  <td>{license.role}</td>
                  <td>{new Date(license.expiresAt).toLocaleDateString()}</td>
                  <td>{license.status}</td>
                  <td>
                    {license.status === 'pending' && (
                      <button onClick={() => activateLicense(license.id)}>Activate</button>
                    )}
                    {license.status === 'active' && (
                      <button onClick={() => revokeLicense(license.id)}>Revoke</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Licensing;