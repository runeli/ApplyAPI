//Represents a schema field that can be validated for an array.
function SchemaField(schemaField) {
    this.type = schemaField.type;
    this.typeString = schemaField.type; //Container for other than primitive types
    this.label = schemaField.label.toLowerCase();
    this.desc = schemaField.desc;
    this.required = schemaField.required;
}

var proto = SchemaField.prototype;

proto.isTraversable = function () {
    return this.type.constructor.name === 'Array';
}

proto.traverseType = function () {
    return traverseType
}

module.exports = SchemaField;