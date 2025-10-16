import React from 'react';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Healthcare Sales SaaS Platform</h1>
        <nav>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#licensing">Licensing</a></li>
            <li><a href="#cme-camps">CME Camps</a></li>
            <li><a href="#ai-integration">AI Integration</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="dashboard">
          <h2>Admin Dashboard</h2>
          <p>Welcome to the Healthcare Sales SaaS Platform</p>
        </section>
      </main>
    </div>
  );
}

export default App;