import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import {
  Order,
  Menu,
  User,
  Auth,
} from './routes';

dotenv.config();

const app = express();

// PORT NUMBER
const PORT = process.env.PORT || '4000';

//  Setting up the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up the morgan middleware
app.use(morgan('dev'));

app.use(cors());


// Setting up handler for a specific route
app.use('/api/v1/orders', Order); // Orders Route
app.use('/api/v1/auth', Auth); // Auth Route
app.use('/api/v1/menu', Menu); // Menu Route
app.use('/api/v1/user', User); // User Route
app.get('/', (req, res) => { res.status(200).json({ message: 'Welcome to Fast Food ' }); });
app.listen(PORT, () => {
  console.log(`Running application on port ${PORT}`);
});

// Exporting so we can use it for our tests
export default app;
