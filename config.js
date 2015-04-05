module.exports = {
    //The path to use for the ApplyAPI. If the user points the request to yourhost:3000/api/apply the request will be evaluated accordingly.
    base: '/api/apply',

    //Port
    port: 80,

    //Title of the page. Displayed inside the <title> tag and used to create a "logo" for the web interface.
    pageTitle: 'ApplyAPI',

    //A link to your orgnanization's homepage / recruitment page or where-ever you provide more information.
    organizationURL: 'http://raute.com/',

    //An URL to a background image rendered in the web UI.
    backgroundURL: 'http://lorempixel.com/1024/760/nature/3/',

    //Shows the amount of applications in the web UI.
    showApplicantCount: true,
    pageDesc: [ //A description of the page.
        'One may use this API to instantaneously create an employment application server for people applying for technical positions. Applications are saved as .json files.',
        'This is not a full-scale HR-management application, just an API with a descriptive web-interface',
        'See config.js for configurations.',
        'Source: <a href="https://github.com/runeli/ApplyAPI">GitHub</a>'
    ].join('<br /><br /> '),

    //Folder to store submitted applications. If it does not exist, it will be created on startup.
    uploadDir: '/uploads',

    //What method to accept when receiving HTTP requests.
    method: 'post',

    //What content type to accept when receiving HTTP requests.
    mime: 'application/json',


    //dataType: 'json',
    fields: [
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
    ],

    writer: {
        fileType: 'json',  //File extension of the saved applications.
        locale: {
            //Finnish time format. You can create your custom formats in similar manner. This is used to formulate the filename's datestring.
            fin: function (date) {
                if (!date) date = new Date();
                return ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
            }

        },
        fileNameFields: ['name', 'lastname'], //Which fields should be visible in the application file.
        separator: '_', //used to differentiate parts in saved filenames
        saveMessage: 'Your application has been saved.' //The message displayed when the application has been successfully saved.

    }
}