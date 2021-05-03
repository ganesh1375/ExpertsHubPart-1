const mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const routes = require('./routes/userRouter');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const MONG_URL = `mongodb+srv://nobody:change76@firstdemoproject.nzko4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const conncetion = mongoose.connect(MONG_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log("unable to connect");
    }
    else {
        console.log("Connection Successfull");
    }
});

app.use('/api', routes);


var server = app.listen(5500, () => {

    var port = server.address().port;
    console.log(`"server is running ${port}"`);
})
