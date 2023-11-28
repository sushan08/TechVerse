import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';

import Connection from './databse/db.js';
import Router from './routes/route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', Router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

Connection(USERNAME, PASSWORD);
app.listen(PORT, () => {
    console.log(`Server running on port: https://localhost:${PORT}`)
}
);