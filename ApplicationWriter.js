var fs = require('fs'),
    writerConfig = require('./writerConfig.js');

//Class used to handle writing of the application.
function ApplicationWriter(application, dest) {
    this.writerConfig = writerConfig;
    this.writerConfig.dest = dest;
    this.application = application;
}

var proto = ApplicationWriter.prototype;

//Writes the current application to a spesified folder
proto.write = function () {

    var stream = fs.createWriteStream(this._generatePath());
    stream.write(JSON.stringify(this.application.data, null, '\t'));
    stream.end();
    return writerConfig.saveMessage;

}

proto._generatePath = function (n) {

    var prefix = '';
    //if n != undefined, prefix the filename
    if (n) {
        prefix = n.toString() + writerConfig.separator;
    }
    
    //Checks if the files should have some spesific format they are saved in. e.g. name_lastname_positionAppliedTo.json
    if (this.writerConfig.fileNameFields && this.writerConfig.fileNameFields.length > 0) {
        prefix += this.writerConfig.fileNameFields
            .map(function (field) { return this.application.data[field.toLowerCase()]; }, this)
            .join(writerConfig.separator) + writerConfig.separator;
    }

    //add date to the filename and form the attempted filename
    var fileName = prefix + this.writerConfig.locale.fin() + '.' + this.writerConfig.fileType;
    var pathToWrite = __dirname + this.writerConfig.dest + '/' + fileName;

    
    //Create unique name for the file if it already exists in the system
    if (fs.existsSync(pathToWrite)) {
        var old_prefix = fileName.slice(0, fileName.indexOf(writerConfig.separator));
        if (isNaN(old_prefix)) {
            return this._generatePath(1);
        } else {
            return this._generatePath(parseInt(old_prefix,10) + 1);
        }
    } else {
        return pathToWrite;
    }

    
}

module.exports = ApplicationWriter;