const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectToMongoDB = require('./config.js');
const pharmacyRouter = require('./Routes/PharmacyRoutes.js');
const patientRouter = require('./Routes/PatientRoutes.js');
const pharmacistRouter = require('./Routes/PharmacistRoutes.js');
const adminRouter = require('./Routes/AdminRoutes.js');
const authRouter = require('./Routes/AuthRoutes.js');
const port = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectToMongoDB();
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use('/api/v1/pharmacy', pharmacyRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/pharmacist', pharmacistRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);
