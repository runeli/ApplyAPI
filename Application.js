var Schema = require('./Schema.js'),
    config = require('./config.js'),
    SchemaField = require('./SchemaField.js');

function Application(applicationData, applicationSchema) {
    this.data = this._cleanApplicationData(applicationData);
    this.schema = new Schema(applicationSchema);
}

var proto = Application.prototype;


//Checks if the data has all fields that are marked `reqiured` in the schema @ config.js's `fields` array.
proto.hasRequiredFields = function () {

    return this.schema
        .requiredFields()
        .map(function (field) { return field.label.toLowerCase() })
        .every(function (labelString) { return this.data.hasOwnProperty(labelString); }, this);

}

//Container for data cleaning. Cleaning is done to avoid
//obvious mistakes such as user typing lower case letter 
//for property names in the application
proto._cleanApplicationData = function (data) {

    //Make all property names lower case for the application data
    return Object.keys(data).reduce(function (newobject, key) { newobject[key.toLowerCase()] = data[key]; return newobject }, {});

}

//Validate if the application data types match those in schema
proto.hasCorrectTypes = function () {

    //Every data field must validate for type.
    return this.schema.schema.every(function (schemaField) {

        var schemaField = new SchemaField(schemaField);

        //Validate for arrays. The given schema field type may be formatted as type: [String]. The submitted data must then consist of an array of strings
        //Multitype arrays are not supported. e.g. type: [String, Number] is an invalid schema.
        if (schemaField.isTraversable()) {

            //Required field is undefined
            if (schemaField.required && !this.data[schemaField.label]){
                return false;
            } else {

                //See if data has a field spesified in the schema
                if (this.data[schemaField.label]) {
                    return this.data[schemaField.label].every(function (dataField) {
                        return schemaField.type[0].name === dataField.constructor.name;
                    });

                //If the data is not defined then return true since we are checking a non-required field
                } else {
                    return true;
                }

            }
        }

        //The submitted data `data` might have additional fields that are not spesified in schema. Check for `undefined`
        if (this.data[schemaField.label]) 
            return this.data[schemaField.label].constructor.name == schemaField.type.name;
            //If the `data` has additional fields that are not spesified in schema, let them pass
        else
            return true;
    }, this);

}

proto.deepComparer = function (data, schema) {
    

}

//Run all validation tests on the application's data
proto.isValid = function () {

    return this.hasRequiredFields() && this.hasCorrectTypes()

}

module.exports = Application;