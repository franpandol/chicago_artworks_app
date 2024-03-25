const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require("compression")

const { initializeApp } = require('firebase-admin/app');
initializeApp();


const artistRoute = require('./routes/artistRoute');
const artworksRoute = require('./routes/artworksRoute');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable All CORS Requests
app.use(cors());
app.use(express.json())
app.use(express.static('frontend/dist'));

// Use morgan middleware for logging
app.use(morgan('combined')); // 'combined' is one of the predefined formats in morgan

// Use Helmet!
//app.use(helmet());
app.use(compression());
// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});



// API Routes
app.use('/api/artists', artistRoute);
app.use('/api/artworks', artworksRoute);
// Redirect all other requests to React app (if using React Router)
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'frontend/dist' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));