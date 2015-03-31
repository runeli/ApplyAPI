module.exports = {
    base: '/api/apply',
    pageTitle: 'ApplyAPI',
    organizationURL: 'http://raute.com/',
    backgroundURL: 'http://lorempixel.com/1024/760/nature/3/',
    showApplicantCount: true,
    pageDesc: [
        'One may use this API to instantaneously create an employment application server for people applying for technical positions. Applications are saved as .json files.',
        
        '<br /><br /> This is not a full-scale HR-management application, just an API with a descriptive web-interface',
        '<br /><br /> See config.js for configurations.'
    ].join(''),
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
            label: 'Location',
            desc: 'Where are you located?',
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
}