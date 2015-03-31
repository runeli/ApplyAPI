function Schema(schema) {
    
    this.schema = schema;
}

var proto = Schema.prototype;

proto.fieldNames = function () {

    return this.schema.map(function (schemaEntry) { return schemaEntry.label; });

}

proto.requiredFields = function (type) {
    
    if (type === undefined)
        return this.schema.filter(function (schemaEntry) { return schemaEntry.required; });
    else 
        return this.schema.filter(function (schemaEntry) { return schemaEntry.type.name === type.name });
}



module.exports = Schema;