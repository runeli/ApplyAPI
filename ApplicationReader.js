var fs = require('fs'),
    readerConfig = require('./writerConfig.js'),
    Application = require('./Application.js'),
    Schema = require('./Schema.js');

function ApplicationReader() {
    
}

var proto = ApplicationReader.prototype;

proto.read = function () {
    
    return Applications = fs.readdirSync(__dirname + readerConfig.dest) //Search the destination folder for files
        .map(function (fileName) { return __dirname + readerConfig.dest + '\\' + fileName; }) //Convert filenames to full path
        .map(function (applicationPath) { return fs.readFileSync(applicationPath, 'utf8') })
        .map(JSON.parse)
        .map(function (ApplicationJsonObject) { return new Application(ApplicationJsonObject, Schema) });
    
}

module.exports = ApplicationReader;