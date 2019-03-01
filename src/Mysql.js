
/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */

/* Importing the basic element of react
 * Including React and React dome ino the file
 * Calling other elements of the page
*/

var os = require("os");
const favicon = require('express-favicon');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */

var executeResults = function(error, results, fields){if(error){return error;} else {return results;};}
const configuration = { host : '35.202.211.71', password : 'eszSILiBx6', user : 'sql7279237', database : 'wbuddy' };
const connection = mysql.createConnection(configuration);

/* Importing the basic element of react
 * Including React and React dome ino the file
 * Calling other elements of the page
*/

const app = express();
const hostname = os.hostname();
const port = process.env.PORT || 5000;
connection.connect();

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */

app.use(favicon(__dirname + '/favicon.ico'));

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */

app.get('/file/apk/', cors(), function (req, res) {   
  res.download("wbuddy.apk");
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */

app.get('/file/ipa/', cors(), function (req, res) {   
  res.download("wbuddy.ipa");
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/', cors(), function (req, res) {   
 const Query = "SELECT * FROM wb_contacts WHERE email LIKE ?";
 connection.query(Query, [req.query.search ? '%' + req.query.search + '%' : '%%'], function (error, results, fields){ 
  res.send(executeResults(error, results, fields));  
 });
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/recent/', cors(), function (req, res) {   
  const Query = "SELECT * FROM wb_contacts WHERE email LIKE ? AND FROM_UNIXTIME(timestamp) > DATE_SUB(CURDATE(), INTERVAL ? DAY)";
  connection.query(Query, ['%' + req.query.search + '%', 7], function (error, results, fields){ 
   res.send(executeResults(error, results, fields));  
  });
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/view/:vid', cors(), function (req, res) {
  const Query = "SELECT * FROM wb_contacts WHERE vid LIKE ?";
  connection.query(Query, [req.params.vid], function (error, results, fields){ 
   res.send(executeResults(error, results[0], fields));  
  });
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/like/:vid/:user', cors(), function (req, res) {  
  const Query = "UPDATE wb_contacts SET likes = likes + ?, fans = CONCAT(fans, ?, ?) WHERE vid LIKE ?";
  connection.query(Query, [1, req.params.user, '|', req.params.vid], function (error, results, fields){ 
    res.send({ success: true, message : 'Contact was added as favorite'}); 
  });
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/delete/:vid', cors(), function (req, res) {
  const Query = "DELETE FROM wb_contacts WHERE vid = ?";
  connection.query(Query, [req.params.vid], function (error, results, fields){  
   res.send({ success: true, message : 'Contact successfully deleted'});
  });
 });

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/insert', cors(), function (req, res) {
 const Query = "INSERT INTO wb_contacts SET ?";
 connection.query(Query, req.query, function (error, results, fields){  
  if(req.query.email){res.send({ success: true, message : 'Your contact ' + req.query.email + ' was successfully added'});}
 });
});

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */
  
app.get('/api/contacts/edit/:vid', cors(), function (req, res) {
  const Query = "UPDATE wb_contacts SET ? WHERE vid LIKE ?";
  connection.query(Query, [req.query, req.query.vid], function (error, results, fields){  
   if(req.query.email){res.send({ success: true, message : 'Your contact ' + req.query.email + ' was successfully Updated'});}
  });
 });

/*
 * This code is developed to demonstrate the use of ReactJS and ReactNatice
 * The deelopment also allows me to demonstrate my capabilities using the framework
 * Following create-react-app methods, the file structure is made from scratch
 * Copyright - World Food Programmes - Digital Transformation
 */

app.get('/', cors(), function (req, res) { res.redirect('/api/contacts/') });
app.listen(port, () => { console.log('Running on http://' + hostname + ':' + port); });