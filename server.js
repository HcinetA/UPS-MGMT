const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect databases
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pauth', require('./routes/api/pauth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/uprofile', require('./routes/api/uprofile'));
app.use('/api/profs', require('./routes/api/profs'));
app.use('/api/posts', require('./routes/api/posts'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
