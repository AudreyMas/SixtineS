const express = require('express')
const app = express();
const ApiRouter = require('./api/index')
const port = 5000;
const bodyParser = require('body-parser');
//dotevent
require('dotenv').config()



//mailgun////
var api_key = `${process.env.REACT_DATABASE_KEY}`;
var domain = `${process.env.REACT_DOMAIN_API_KEY}`;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

//mail confirmation order - page ResumeOrder
app.get('/mail-confirm-order', function (req, res, next) {
  const mail = "pradal.cyril@gmail.com"
  mailgun.messages().send({
    from: "Sixtine's <testmailsent.wcs@gmail.com>",
    to: 'testmailsent.wcs@gmail.com>' + mail, //recupérer le mail selon l'id du magasin
    subject: "Sixtine's : confirmation order",
    text: "Your order is confirmed",
    //dans html récupérer 
    html: "<p>Dear Parachute, </p> <p>Your order is confirmed! </p> <p>The dilivery will be done at the chosen date: 2018-02-12</p> <p>&nbsp;</p> <ul><li>Your login : <b>Parachute@gmail.be</b></li><li>Your password : <b>monmotdepasse</b></li></ul>  <p>&nbsp;</p>  <h4>Your order infos :</h4><ul><li>N° order: <b>1</b></li> <li>Order date : <b>2018-02-12</b></li> <li>Total price : <b>200€</b></li></ul> <p>&nbsp;</p>  <p>Have a good day!</p><p>Sixtine's team</p>"
  });
});



//mail remind an unpaid bill - page admin/bill 
app.get('/mail-remind-bill', function (req, res, next) {
  const mail = "pradal.cyril@gmail.com"

  mailgun.messages().send({
    from: "Sixtine's <testmailsent.wcs@gmail.com>",
    to: 'testmailsent.wcs@gmail.com,' + mail, //recupérer le mail selon l'id du magasin
    subject: "Sixtine's : unpaid bill",
    text: "Remind bill",
    //dans html récupérer 
    html: " <p>Dear Parachute,</p> <p>your order <b>2</b> is not paid. </p> <p>&nbsp;</p> <ul><li>Your login : Parachute@gmail.be</li><li>Your password : monmotdepasse </li></ul>  <p>&nbsp;</p>  <p>&nbsp;</p> <h4>Your order infos :</h4> <ul><li>N° order: <b>2</b></li> <li>Order date : <b>2018-02-12</b></li> <li>Total price : <b> 400€</b></li></ul> <p>Have a good day!</p> <p>&nbsp;</p> <p>&nbsp;</p> <p>Sixtine's team</p>"
  });
});


//mail new stock  - page admin/manage-stock 
app.get('/mail-new-stock', function (req, res, next) {
  const mail = "pradal.cyril@gmail.com"

  mailgun.messages().send({
    from: "Sixtine's <testmailsent.wcs@gmail.com>",
    to: 'testmailsent.wcs@gmail.com,' + mail, //recupérer le mail selon l'id du magasin
    subject: "Sixtine's : New stock",
    text: "New stock",
    //dans html récupérer 
    html: " <p>Dear Parachute Jump, a new stock is available"
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', ApiRouter);

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});


module.exports = app;