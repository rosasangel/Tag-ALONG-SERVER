var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var path = require('path');
var mongoose = require('mongoose');



var multer = require('multer');
var upload = multer();
require('isomorphic-fetch');

var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({
    accessToken: '5ignSrPi4_AAAAAAAAAALoBnoAqRmm31TJlBEyxDhGDIN5S3Uly_UzLi29IJqi4t'
});
var app = new express();
// var db= mongoose.connect('mongodb://angrosas:Google14@ds153179.mlab.com:53179/tagalong');


mongoose.connect('mongodb://angelrr:lakers13@ds153179.mlab.com:53179/tagalong');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('once', function() {
    console.log('successfully conected to database')
})




//Step 3. Declare your middleware
app.use(bodyParser.json());
//This means we only want to use json. Json is a function, so we need empty paren.  Middleware goes inside the paren after "use" because that's what we're using. 
app.use(bodyParser.urlencoded({
    extended: true
}));
//This handles data that is nested in other functions, so it is an absolute must.
app.use(cors({ origin: true, credentials: true }));
app.use(cors({
    origin: true,
    credentials: true
}));

//Step 4. Create simple API
//This is on a basic level what an API route looks like.  The '/' is the url.

app.get('/getGallery', function (request, response) {
    var gallery = [{
            url: '../assets/cultural/atole.jpg',
            type: 'culture',
        },
        
    ];

    response.status(200).send(gallery);
});


app.listen(8080, function () {
    console.log('my server is listening on localhost:8080');
})




//where nodemailer starts

// 'use strict';
// const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: account.user, // generated ethereal user
//             pass: account.pass // generated ethereal password
//         }
//     });

//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: 'rosasdeangel@outlook.com', // sender address
//         to: 'rosasangel1000@gmail.com', // list of receivers
//         subject: 'hello', // Subject line
//         text: 'Hello world?', // plain text body
//         context: {
//             firstName: request.body.firstName,
//             lastName: request.body.lastName,
//             email: request.body.email,
//             comments: request.body.subject,
//           }
//     };
//     let handlebarsOptions = {
//         viewEngine: 'handlebars',
//         viewPath: path.resolve('./templates'),
//         extName: '.html',
//       }
  
//       transporter.use('compile', hbs(handlebarsOptions));

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
// });