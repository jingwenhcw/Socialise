import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './mongoDB/connect.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import postRoutes from './routes/post.routes.js';

import { verifyToken } from './middleware/auth.js';
import { register } from './controllers/auth.controller.js';
import { createPost } from './controllers/post.controller.js';

import User from './models/User.js';
import Post from './models/Post.js';
//mock data
import { users, posts } from './data/index.js';

/* Configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());

// setup HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// setup morgan to log HTTP requests & errors
app.use(morgan('common'));

// setup body parsing for json and URL-encoded form
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// enable All CORS requests
app.use(cors());

// set our assets directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* File storage */
const storage = multer.diskStorage({
  // save file to public/assets folder
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES with Files */
// upload the image before running the register controller function
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    // start app
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);

      // add mock data for testing
      //User.insertMany(users);
      //Post.insertMany(posts);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
