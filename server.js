/**
 * Local development server for the API
 * Run with: node server.js
 */

const http = require('http');
const url = require('url');

// Import handlers
const predictCrowd = require('./api/predict-crowd');
const transit = require('./api/transit');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  // Mock Express-like request/response
  req.query = parsedUrl.query;
  
  // Parse body for POST requests
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    await new Promise(resolve => req.on('end', resolve));
    try {
      req.body = JSON.parse(body || '{}');
    } catch {
      req.body = {};
    }
  }
  
  // Add Express-like response methods
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };
  res.end = res.end.bind(res);
  
  // Route handling
  try {
    if (path === '/api/predict-crowd') {
      await predictCrowd(req, res);
    } else if (path === '/api/transit') {
      await transit(req, res);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 API Server running at http://localhost:${PORT}`);
  console.log(`   - POST /api/predict-crowd`);
  console.log(`   - GET  /api/transit\n`);
});
