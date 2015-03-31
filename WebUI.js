var SchemaField = require('./SchemaField.js');

function WebUI(applications, config) {
    this.applications = applications;
    this.config = config;
}
var proto = WebUI.prototype;

//Get all applications from the filesystem
proto.getApplicationNames = function () {
    return this.applications.map(function (x) { return x.data;});
}

//Get all the fields that are spesified in the schema
proto.getFields = function () {
    return this.config.fields.map(function (field) {
        var schemaField = new SchemaField(field);
        if (schemaField.isTraversable()) {
            schemaField.typeString = '[' + schemaField.type[0].name + ']';
        } else {
            schemaField.typeString = schemaField.type.name;
        }
        return schemaField;
    })
}

module.exports = WebUI;