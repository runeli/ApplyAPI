# ApplyAPI

A quick an easy way to create a server that can be used to store applications for employment or other events.

## Demo

[Click here for the demo](http://demo/)

## Quickstart
```
    git clone https://github.com/runeli/ApplyAPI.git ApplyAPI
    cd ApplyAPI
    npm install
    npm start
```
See web UI at:[http://localhost:3000/api](http://localhost:3000/api)  
Send a HTTP POST request with Content-type type of`application/json` to`/api/apply/`

If everything is good to go you will receive a HTTP 200 response and a message indicating that your application has been saved.

## Configurations

ApplyAPI has a configuration file where you may setup the application variables.

see**config.js**

### Configurable fields

#### base

The path to use for the ApplyAPI. If the user points the request to`yourhost:3000/api/apply` the request will be evaluated accordingly.  
_default_:`'/api/apply'`

#### pageTitle

Title of the page. Displayed inside the

 tag and used to create a "logo" for the web interface.  
_default_:`'ApplyAPI'`
#### organizationURL

A link to your orgnanization's homepage / recruitment page or where-ever you provide more information.  
_default_:`'http://raute.com'`

#### backgroundURL

An URL to a background image rendered in the web UI.  
_default_:`'http://lorempixel.com/1024/760/nature/3/'`

#### showApplicantCount

Shows the amount of applications in the web UI.  
_default_:`true`

#### pageDesc

A description of this projects purpose. Rendered in the web UI._default_:`true`

#### uploadDir

Folder to store submitted applications. If it does not exist, it will be created on startup._default_:`/uploads`

#### method

What method to accept when receiving HTTP requests._default_:`post`

#### mime

What content type to accept when receiving HTTP requests._default_:`application/json`

#### fields

A schema of the application. The schema consists of an array of objects. Each object is formatted as follows:
```javascript
{
  type: String,               //Type of the answer the API expects from the user.
  label: 'name',              //Name the field of the JSON application object. 
  desc: 'What is your name?', //Additional information regarding this field.
  required: true              //If user does not submit a required field, the application will be rejected.
}
```
_default_:
```javascript
[
        {
            type: String,
            label: 'name',
            desc: 'What is your name?',
            required: true
        },
        {
            type: String,
            label: 'lastname',
            desc: 'What is your last name?',
            required: true
        },
        {
            type: String,
            label: 'email',
            desc: 'What is your email?',
            required: true
        },
        {
            type: String,
            label: 'location',
            desc: 'Where are you located?',
            required: false
        },
        {
            type: Number,
            label: 'age',
            desc: 'How old are you?',
            required: false
        },
        {
            type: [String],
            label: 'github',
            desc: 'List of your projects URLs',
            required: false
        },
        {
            type: Boolean,
            label: 'remote',
            desc: 'Do you need to work remotely?',
            required: false
        }
    ]
```
