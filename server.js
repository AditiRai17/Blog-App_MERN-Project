const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//env config
dotenv.config();

//routes import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//mongodb connection
connectDB();


//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
/*
app.get('/', (req, res) => {
    res.status(200).send({
        message : "Node Server"
    })
})
*/
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
//Port
const PORT = process.env.PORT || 6060;
//listen
app.listen(6060, () => {
    //console.log(`Server is running on port 8080`.bgCyan.white);
    console.log(`Server is running on ${process.env.DEV_MODE} mode port no. ${PORT}`.bgCyan.white);
})