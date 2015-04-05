module.exports = {
    base: '/api/apply',
    pageTitle: 'ApplyAPI',
    organizationURL: 'http://raute.com/',
    backgroundURL: 'http://lorempixel.com/1024/760/nature/3/',
    showApplicantCount: true,
    pageDesc: [
        'One may use this API to instantaneously create an employment application server for people applying for technical positions. Applications are saved as .json files.',
        'This is not a full-scale HR-management application, just an API with a descriptive web-interface',
        'See config.js for configurations.'
    ].join('<br /><br /> '),
    uploadDir: '/uploads',
    method: 'post',
    mime:'application/json',
    dataType: 'json',
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
        dest: '/uploads', //Folder to upload the applications.
        locale: {
            //Finnish time format. You can create your custom formats in similar manner
            fin: function (date) {
                if (!date) date = new Date();
                return ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
            }

        },
        fileNameFields: ['name', 'surname'], //Which fields should be visible in the application file.
        separator: '_', //used to differentiate parts in saved filenames
        saveMessage: 'Your application has been saved.' //The message displayed when the application has been successfully saved.

    }
}