console.log('Starting at ' + process.env.PORT);
var express = require("express"),
    app = express(),
    fs = require('fs'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    parse = require('./parse.js')
    Application = require('./Application.js'),
    ApplicationWriter = require('./ApplicationWriter.js'),
    ApplicationReader = require('./ApplicationReader.js'),
    WebUI = require('./WebUI.js'),
    hbs = require('express-handlebars');

app.use(bodyParser.json());
app.set('views', './views');
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');


app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use(function (err, req, res, next) {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Invalid request - Check your data: ' + err);
});

//Create uploads directory if it does not exist
if (!fs.existsSync(__dirname + config.uploadDir)) {
    fs.mkdirSync(__dirname + config.uploadDir);
}

//Main api call
app[config.method].call(app, config.base, function (req, res) {
    
    if (config.method.toLowerCase() === 'get') {
        req.body = parse(req.query);
    }
    var application = new Application(req.body, config.fields);
    if (application.isValid()) {
        var writer = new ApplicationWriter(application);
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end(writer.write());
    } else {
        res.writeHead(400, { 'Content-type': 'text/plain' });
        res.end('Invalid request - Check your data');
    }

});

//Show a web interface that assists users applying
app.get('/api/', function (req, res) {
    var reader = new ApplicationReader();
    var apps = reader.read();
    var webUI = new WebUI(apps, config);
    res.render('home', { appCount: webUI.getApplicationNames().length, fields: webUI.getFields(), config: config });
});

var port = process.env.PORT;
app.listen(port, function () {
    console.log("Working on port: " + process.env.PORT);
});

