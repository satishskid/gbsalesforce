import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // fetch('/api/organizations')
    //   .then(response => response.json())
    //   .then(data => {
    //     setOrganizations(data);
    //     setLoading(false);
    //   });
    
    // Mock data for demonstration
    setOrganizations([
      { id: 1, name: 'MedTech Solutions', industry: 'Medical Devices', plan_type: 'enterprise', max_licenses: 50 },
      { id: 2, name: 'PharmaCorp', industry: 'Pharmaceuticals', plan_type: 'standard', max_licenses: 25 },
    ]);
    
    setUsers([
      { id: 1, org_id: 1, role: 'ceo', email: 'ceo@medtech.com', name: 'John Smith', is_active: true },
      { id: 2, org_id: 1, role: 'cto', email: 'cto@medtech.com', name: 'Jane Doe', is_active: true },
      { id: 3, org_id: 2, role: 'manager', email: 'manager@pharmacorp.com', name: 'Bob Johnson', is_active: true },
    ]);
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <section>
        <h3>Organizations</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Plan Type</th>
              <th>Max Licenses</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map(org => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>{org.industry}</td>
                <td>{org.plan_type}</td>
                <td>{org.max_licenses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      <section>
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const org = organizations.find(o => o.id === user.org_id);
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{org ? org.name : 'Unknown'}</td>
                  <td>{user.is_active ? 'Active' : 'Inactive'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;