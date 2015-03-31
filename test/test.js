var assert = require('assert');
var application = require('../Application.js');
var schema = require('../Schema.js');
var ApplicationWriter = require('../ApplicationWriter.js');
var writerConfig = require('../writerConfig.js');

var superSchema = [
    {
        type: String,
        label: 'name',
        description: 'What is your name?',
        required: true
    },
    {
        type: Number,
        label: 'age',
        description: 'How old are you?',
        required: false
    },
    {
        type: Number,
        label: 'length',
        description: 'How long are you?',
        required: true
    }];

var superData = {
    name: 'Aleksanteri',
    age: 27,
    length: 22
};

describe('Application class tests', function () {

    it('schould validate that the submission matches the schema', function () {
        var schema = [{
            type: String,
            label: 'name',
            description: 'What is your name?',
            required: true,
            minLength: 3
        },
        {
            type: Number,
            label: 'age',
            description: 'How old are you?',
            required: false
        },
        {
            type: Number,
            label: 'length',
            description: 'How long are you?',
            required: false
        }];

        var data = {
            name: 'Aleksanteri',
            age: 27,
            length: 22
        };

        var app = new application(data, schema);
        assert(app.hasRequiredFields());

    });
    it('Should not have all required fields', function () {
        var schema = [{
            type: String,
            label: 'name',
            description: 'What is your name?',
            required: true
        },
        {
            type: Number,
            label: 'age',
            description: 'How old are you?',
            required: false
        },
        {
            type: Number,
            label: 'length',
            description: 'How long are you?',
            required: true
        }];

        var data = {
            name: 'Aleksanteri',
            age: 29
        };

        var app = new application(data, schema);
        assert(!app.hasRequiredFields());

    });

    it('Should have correct types', function () {
        var app = new application(superData, superSchema);
        assert(app.hasCorrectTypes());
    });

    it('Should have incorrect types', function () {
        
        var superDataa = Object.create(superData);
        superDataa.name = 5;
        var app = new application(superDataa, superSchema);
        assert(!app.hasCorrectTypes());
    });

    it('Should validate deep types', function () {

        var schema = Object.create(superSchema);
        schema.push({
            type: [String],
            label: 'projects',
            description: 'List of strigns desc',
            required: false
        });

        var data = superData;
        data.projects = ['project1', 'project2'];
        var app = new application(data, schema);
        assert(app.hasCorrectTypes());

    });
    it('Should have incorrect deep types', function () {

        var schema = Object.create(superSchema);
        schema.push({
            type: [Number],
            label: 'projects',
            description: 'List of strigns desc',
            required: false
        });

        var data = superData;
        data.projects = ['project1', 'project2'];
        var app = new application(data, schema);
        assert(!app.hasCorrectTypes());
    });
});

describe('Writer tests', function () {


});

describe('Schema tests', function () {

    it('Should output schema that has only required fields', function () {
        var schemaCfg = [{
            type: String,
            label: 'name',
            description: 'What is your name?',
            required: false
        },
        {
            type: Number,
            label: 'age',
            description: 'How old are you?',
            required: false
        },
        {
            type: Number,
            label: 'length',
            description: 'How long are you?',
            required: false
        }];
        var s = new schema(schemaCfg);
        assert.equal(s.requiredFields().length, 0);


    });

    

});