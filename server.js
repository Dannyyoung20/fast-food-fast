import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import Orders from './routes/order';

const app = express();

// PORT NUMBER
const PORT = process.env.PORT || '6000';

//  Setting up the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up the morgan middleware
app.use(morgan('dev'));


// Setting up handler for a specific route
app.use('/api/v1/orders', Orders);

app.listen(PORT, () => {
  console.log(`Running application on port ${PORT}`);
});

// Exporting so we can use it for our tests
export default app;
