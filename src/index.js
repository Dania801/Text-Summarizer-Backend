import express from 'express';
import constants from './config/constants';
import './config/database';
import middelwareConfig from './config/middlewares';
import apiRoutes from './modules';
const app = express();
middelwareConfig(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

apiRoutes(app);

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
       Server running on port: ${constants.PORT}
       ---
       Running on: ${process.env.NODE_ENV}
       ---
       Make something great
       `);
  }
});
