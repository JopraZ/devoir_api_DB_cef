const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

const authRoutes = require('./router/authRoutes');
app.use('/api', authRoutes);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});

