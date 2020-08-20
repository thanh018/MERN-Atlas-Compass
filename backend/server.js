const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const URI_ATLAS = process.env.ATLAS_URI;
const URI_COMPASS = 'mongodb://localhost:27017/reactApp';
mongoose.connect(URI_COMPASS, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
