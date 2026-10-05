require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const movieRoutes = require('./routes/movie-routes');
const bookingRoutes = require('./routes/booking-routes');
const cors = require('cors');


app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

//middleware
app.use(express.json());

//routes
app.use('/users', userRoutes);
app.use('/admin',adminRoutes);
app.use('/movies',movieRoutes);
app.use('/booking',bookingRoutes);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();