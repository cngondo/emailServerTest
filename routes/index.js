var dotenv = require('dotenv').load();
var express = require('express');
var router = express.Router();
// require sendgrid mailer
var sendgrid  = require('sendgrid')(process.env.API);
var Hogan = require('hogan.js');
var fs = require('fs');

/*Get the file*/
var template = fs.readFileSync('views/email.hjs', 'utf-8');
/*Compile the template*/
var compiledTemplate = Hogan.compile(template);

/*Immediate action rendered once the app is invoved
* Mailer uses sendgrid API provided above
*/
router.get('/', function(req, res, next) {
    sendgrid.send({
    to:       process.env.EMAIL,
    from:     'noreply@moringa.com',
    subject:  'NOMA SANA',
    html:     compiledTemplate.render({firstName: 'Cornellius'})
  }, function(err, json) {
    if (err) { return res.send('It didnt work dude!! try again'); }
    res.send('IT WORKED!!');
  });
});

/*Create a preview route to try and preview the email before sending it*/
router.get('/preview', function(req, res){
  res.render('email', {firstName: 'Cornellius'});
});

module.exports = router;
