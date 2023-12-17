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
const chatRouter = require('./Routes/ChatRoutes');
const notificationRouter = require('./Routes/NotificationRoutes');
const port = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectToMongoDB();
const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use('/api/v1/pharmacy', pharmacyRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/pharmacist', pharmacistRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/notifications', notificationRouter);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', socket => {
  console.log('Connected to socket. congrats');
  socket.on('setup', userData => {
    console.log('setup completed. congrats');
    socket.join(userData);
    socket.emit('connected');
  });

  socket.on('join chat', room => {
    socket.join(room.chat);
    console.log(room.username + ' Joined chat with id: ' + room.chat);
  });

  socket.emit('me', socket.id);

  socket.on('new message', newMessageRecieved => {
    if (newMessageRecieved.msg.sender === newMessageRecieved.loggedIn) return;
    socket.in(newMessageRecieved.msg.chat).emit('message recieved', newMessageRecieved.msg);
    console.log('Message Recieved: ' + newMessageRecieved.msg.content);
  });

  socket.on('callUser', data => {
    socket.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
  });

  // socket.on('answerCall', data => {
  //   socket.to(data.to).emit('callAccepted', data.signal);
  // });
});
