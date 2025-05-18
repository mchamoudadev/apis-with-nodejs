import express from 'express'
import helmet from 'helmet';


import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import tasksRoute from './routes/tasks.js'

import dotenv from 'dotenv'
import { notFound } from './middlewares/notfound.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import rateLimit from 'express-rate-limit';

dotenv.config();
import cors from 'cors'
import morgan from 'morgan';
import mongoose from 'mongoose';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import { limiter } from './middlewares/rateLimiter.js';


const app = express();
const PORT = process.env.PORT || 5000

// GET -- get information
// POST -- post information
// PUT -- update information
// DELETE -- delete information
// Sample in-memory data
let users = [
    { id: 1, name: 'Ayaan' },
    { id: 2, name: 'Fatima' },
    { id: 3, name: 'Zubeyr' }
];


app.use(helmet())
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:5879", "https://dugsiiye.com"]
    }
))

app.use(limiter);

console.log(
    process.env.NODE_ENV
)
if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'))
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// custom middlewares
// app.use(logger);

// Routes

// routes middleware

// diiwan gelin routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/upload', uploadRoutes);
app.use('/tasks', tasksRoute);

app.get('/', (req, res) => {
    res.json(users)
})


// last route-level middleware
app.use(notFound);

app.use(errorHandler);

// connect to mongodb

mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then(() => console.log("✅ MongoDB connected locally"))
    .catch((err) => console.log("❌ Connection err:", err))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})