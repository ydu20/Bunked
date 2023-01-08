require('dotenv').config();
// import modules
const express = require('express');
const mongoose  = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const tf = require('@tensorflow/tfjs')
const encoder = require('@tensorflow-models/universal-sentence-encoder') // to load text encoder model

// app
const app = express();
app.use(express.urlencoded());

// db
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERROR", err));

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'userSessions',
})

app.use(session({
    secret: 'catLabyrinthMonke2212',
    name: 'session-id', 
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      sameSite: 'lax',
      HTTPonly: true,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
}));

// middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials: true}));

// routes
const userRoutes = require('./routes/user.routes');
const actionRoutes = require('./routes/action.routes');
app.use("/", userRoutes);
app.use("/actions/", actionRoutes);

// port
const port = process.env.PORT || 8080;

// Encoder model
encoder.load().then(model => app.set('encoder', model));

// listener
const server = app.listen(port, () => console.log('Server is running on port ' + port));