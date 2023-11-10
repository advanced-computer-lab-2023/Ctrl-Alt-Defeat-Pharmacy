const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectToMongoDB = require('./config.js');
const pharmacyRouter = require('./Routes/PharmacyRoutes.js');
const port = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectToMongoDB();
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use('/api/v1/pharmacy', pharmacyRouter);
