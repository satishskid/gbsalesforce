import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Healthcare Sales SaaS API is running' });
});

// Organization routes
app.post('/api/organizations', (await import('./functions/createOrg.js')).default.handler);

// User routes
app.post('/api/users', (await import('./functions/createUser.js')).default.handler);

// License routes
app.post('/api/licenses', (await import('./functions/createLicense.js')).default.handler);
app.put('/api/licenses/activate', (await import('./functions/activateLicense.js')).default.handler);
app.get('/api/licenses', (await import('./functions/listLicenses.js')).default.handler);
app.post('/api/licenses/revoke', (await import('./functions/revokeLicense.js')).default.handler);

// AI Configuration routes
app.post('/api/ai-config', (await import('./functions/saveAiConfig.js')).default.handler);

// CME Camp routes
app.post('/api/cme-camps', (await import('./functions/createCmeCamp.js')).default.handler);

// AI Proxy route
app.post('/api/ai-proxy', (await import('./functions/aiProxy.js')).default.handler);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Healthcare Sales SaaS server is running on port ${PORT}`);
});

export default app;