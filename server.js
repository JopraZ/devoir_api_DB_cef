const express = require('express');
const path = require('path');
const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api-doc', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api_doc.html'));
});


const authRoutes = require('./router/authRoutes');
app.use('/api', authRoutes);

const userRoutes = require('./router/userRoutes')
app.use('/users', userRoutes);

const catwayRoute = require('./router/catwayRoutes');
app.use('/catways', catwayRoute);

const reservationRoutes = require('./router/reservationRoutes');
app.use('/reservations', reservationRoutes);

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
