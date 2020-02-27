const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const log = require("./utils/logger");
const path = require("path")

//Import routes

const authRoute = require("./routes/auth");
const imageRoute = require("./routes/image");
const olympiadRoute = require("./routes/olympiad");
const userRoute = require("./routes/users");
const answerRoute = require("./routes/answers")

dotenv.config();

//Connection

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, () => {
    log('Connected to the DB')
})

// Body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// CORS

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Auth-Token");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT")
    next();
});

//Static

app.use(express.static('static'));

//Routes middleware

app.use('/api/user', authRoute);
app.use('/api/image', imageRoute);
app.use('/api/olympiad', olympiadRoute);
app.use('/api/users', userRoute)
app.use('/api/answers', answerRoute)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});


app.listen(process.env.PORT || 3000, () => {
    log(`Server is listening on ${process.env.PORT || 3000}`)
});