var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    //response.render('home');
    response.sendFile(__dirname + '/views/index.html');
});


//Manual

var Q = require('q');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = require('./connection.js');
var dataHandling = require('./data_handling.js');

app.post('/connection', function(req, res) {
    console.log('hello connection');
    console.log(req.body);
    switch (req.body.connectTo) {
        case 'services':
            connection.connectToServices(req.body.usingTeams)
                .then(function() {
                    res.json(req.body);
                });
            break;
        case 'records':
            connection.connectToRecords(req.body.team)
                .then(function(responseData) {
                    console.log('hi');
                    console.log(responseData);
                    res.json(responseData);
                });
            break;
    }
    // res.json(req.body);
});

app.post('/change-record', function(req, res) {
  console.log('hello console');
  console.log(req.body);
  res.json(req.body);
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


