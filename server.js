const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect databases
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pauth', require('./routes/api/pauth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/uprofile', require('./routes/api/uprofile'));
app.use('/api/profs', require('./routes/api/profs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
