import React, { useState } from 'react';

const CmeCampManagement = () => {
  const [cmeCamps, setCmeCamps] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    expectedAttendees: ''
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
    // fetch('/api/cme-camps', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    
    // Mock implementation
    const newCmeCamp = {
      id: Date.now(),
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      expectedAttendees: parseInt(formData.expectedAttendees),
      createdAt: new Date().toISOString()
    };
    
    setCmeCamps(prev => [...prev, newCmeCamp]);
    setFormData({ name: '', startDate: '', endDate: '', location: '', expectedAttendees: '' });
    setShowForm(false);
  };

  return (
    <div>
      <h2>CME Camp Management</h2>
      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New CME Camp'}
      </button>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>Create New CME Camp</h3>
          <label>
            Camp Name:
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <label>
            Start Date:
            <input 
              type="date" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <label>
            End Date:
            <input 
              type="date" 
              name="endDate" 
              value={formData.endDate} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <label>
            Location:
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <label>
            Expected Attendees:
            <input 
              type="number" 
              name="expectedAttendees" 
              value={formData.expectedAttendees} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          
          <button type="submit">Create CME Camp</button>
        </form>
      )}
      
      <section>
        <h3>Upcoming CME Camps</h3>
        {cmeCamps.length === 0 ? (
          <p>No CME camps found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Location</th>
                <th>Expected Attendees</th>
              </tr>
            </thead>
            <tbody>
              {cmeCamps.map(camp => (
                <tr key={camp.id}>
                  <td>{camp.name}</td>
                  <td>{new Date(camp.startDate).toLocaleDateString()}</td>
                  <td>{new Date(camp.endDate).toLocaleDateString()}</td>
                  <td>{camp.location}</td>
                  <td>{camp.expectedAttendees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default CmeCampManagement;