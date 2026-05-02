const express = require('express');
const cors = require('cors');
const { pool, initDB } = require('./model/db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Database
initDB();

// ==========================================
// ROUTES FOR FIND/LOST
// ==========================================

// Get all find/lost items
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM find_lost_items ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new find/lost item
app.post('/api/items', async (req, res) => {
  try {
    const { type, title, description, location, contactInfo, image } = req.body;
    const createdAt = new Date().toISOString();
    
    const sql = `INSERT INTO find_lost_items (type, title, description, location, contactInfo, image, createdAt, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`;
    
    const [result] = await pool.query(sql, [type, title, description, location, contactInfo, image, createdAt]);
    
    res.json({ id: result.insertId, type, title, description, location, contactInfo, image, createdAt, status: 'active' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resolve find/lost item
app.put('/api/items/:id/resolve', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("UPDATE find_lost_items SET status = 'resolved' WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ROUTES FOR COMMUNITY HELP
// ==========================================

// Get all help requests (including volunteers)
app.get('/api/requests', async (req, res) => {
  try {
    const [requests] = await pool.query('SELECT * FROM help_requests ORDER BY id DESC');
    const [allVolunteers] = await pool.query('SELECT * FROM volunteers');
    
    const populatedRequests = requests.map(req => {
      return {
        ...req,
        volunteers: allVolunteers.filter(v => v.requestId === req.id)
      };
    });
    
    res.json(populatedRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new help request
app.post('/api/requests', async (req, res) => {
  try {
    const { title, category, description, location, urgency, contactName, contactPhone } = req.body;
    const createdAt = new Date().toISOString();
    
    const sql = `INSERT INTO help_requests (title, category, description, location, urgency, contactName, contactPhone, createdAt, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`;
                 
    const [result] = await pool.query(sql, [title, category, description, location, urgency, contactName, contactPhone, createdAt]);
    
    res.json({ id: result.insertId, title, category, description, location, urgency, contactName, contactPhone, createdAt, status: 'active', volunteers: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resolve help request
app.put('/api/requests/:id/resolve', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("UPDATE help_requests SET status = 'resolved' WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add volunteer to a request
app.post('/api/requests/:id/volunteer', async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const { name, phone, message } = req.body;
    const acceptedAt = new Date().toISOString();
    
    const sql = `INSERT INTO volunteers (requestId, name, phone, message, acceptedAt) VALUES (?, ?, ?, ?, ?)`;
    
    const [result] = await pool.query(sql, [requestId, name, phone, message, acceptedAt]);
    
    res.json({ id: result.insertId, requestId, name, phone, message, acceptedAt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ROUTES FOR AUTHENTICATION
// ==========================================

app.post('/api/register', async (req, res) => {
  try {
    const { name, age, mobile, email, password } = req.body;
    const createdAt = new Date().toISOString();
    
    // Simple password storage (in production, use bcrypt)
    const sql = `INSERT INTO users (name, age, mobile, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [name, age, mobile, email, password, createdAt]);
    
    res.json({ id: result.insertId, name, email, mobile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (rows.length > 0) {
      const user = rows[0];
      res.json({ id: user.id, name: user.name, email: user.email, mobile: user.mobile });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
