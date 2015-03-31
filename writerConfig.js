module.exports = {

    fileType:'json',  //File extension of the saved applications.
    dest: '/uploads', //Folder to upload the applications.
    locale: {
        fin: function (date) {
            if(!date) date = new Date();
            return ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
        }
    },
    fileNameFields: ['name', 'surname'], //Which fields should be visible in the application file.
    separator: '_', //used to differentiate parts in saved filenames
    saveMessage: 'Your application has been saved.' //The message displayed when the application has been successfully saved.
}