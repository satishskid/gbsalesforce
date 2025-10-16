// Database connection utility
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a pool of connections
const { Pool } = pg;

// In a real application, you would use environment variables for database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/healthcare_sales',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

const query = (text, params) => pool.query(text, params);

export { query };
export default { query };