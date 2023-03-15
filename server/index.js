import express from 'express'; // Use to create Routes for entire app.
import * as dotenv from 'dotenv'; // Allows us to use environment variables.
import cors from 'cors'; // For cross origin request.

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js'
import propertyRouter from './routes/property.routes.js'


dotenv.config();

// Middleware
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
// Specify the limit for the files we'll be sending from the frontend.

// Mock route to know if the backend is running
app.get('/', (req, res) => {
    res.send({ message: 'Backend in Business !' });
});

// Using routes by calling middleware
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);


const startServer = async () => {
    try {
        // connect to the datebase...
        connectDB(process.env.MONGODB_URL)

        app.listen(8080, () => console.log('Server started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
} 

startServer();
