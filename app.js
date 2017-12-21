var express = require('express');
var app = express();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var randtoken = require('rand-token');
var bodyParser = require('body-parser');


var user;
var string;
var flag;
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'mydb',

});


app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/style',  express.static(__dirname + '/style'));
//SESSION CHECK FUNCTION NOT WORKING (ASYNC ISSUE)
/*function sessionCheck(checktoken) {
	var selectString='SELECT COUNT(email) FROM mytable1 WHERE email="'+user+'" AND sid="'+checktoken+'" ';
   connection.query(selectString, function(err, results) {

        //console.log(results);
        string=JSON.stringify(results);
        console.log(string);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
        	flag=1;
          }
 		else {
          flag=0;
        }
        
});


}*/
//
// Reverse string
function reverseString(str) {
	var ptrn = /(\d{4})\-(\d{2})\-(\d{2})/;
	if(!str || !str.match(ptrn)) {
		return null;
	}
	return str.replace(ptrn, '$2-$3-$1');
}


connection.query('SELECT * from mytable1', function(err, rows, fields) {
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error while performing Query.');
});
//
//connection.end();
// Binding express app to port 3000
app.listen(3000,function(){
	console.log('Node server running @ http://localhost:3000')
});




app.get('/',function(req,res){
	
	
	res.sendFile('home.html',{'root': __dirname + '/templates'});

});

app.get('/logout',function(req,res){
	res.clearCookie("sid");
	connection.query('UPDATE mytable1 SET sid=NULL WHERE email="'+user+'"',function(err,res){
		if(err) throw err;
		console.log('Session id deleted from database');

	});
	res.redirect('/');
});

app.get('/showSignInPage',function(req,res){
	res.sendFile('signin.html',{'root': __dirname + '/templates'});
});


app.get('/showSignInPageretry',function(req,res){
	res.sendFile('signinretry.html',{'root': __dirname + '/templates'});
});
app.get('/showSignUpPage',function(req,res){
	res.sendFile('signup.html',{'root':__dirname + '/templates'})
});

app.get('/message',function(req,res){
	res.sendFile('message.html',{'root': __dirname + '/templates'});
});

app.get('/loggedin',function(req,res){

	var selectString='SELECT COUNT(email) FROM mytable1 WHERE email="'+user+'" AND sid="'+req.cookies.sid+'" ';
	connection.query(selectString, function(err, results) {

       
        string=JSON.stringify(results);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
        	res.sendFile('loggedin.html',{'root': __dirname + '/templates'});
        }
        else {
        	res.sendFile('session.html',{'root': __dirname + '/templates'});
        }
        
    });

	
});
app.get('/found',function(req,res){
	res.sendFile('found.html',{'root': __dirname + '/templates'});
});
app.get('/report',function(req,res){
	
	var selectString='SELECT COUNT(email) FROM mytable1 WHERE email="'+user+'" AND sid="'+req.cookies.sid+'" ';
	connection.query(selectString, function(err, results) {

       
        string=JSON.stringify(results);
       
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
        	res.sendFile('report.html',{'root': __dirname + '/templates'});
        }
        else {
        	res.sendFile('session.html',{'root': __dirname + '/templates'});
        }
        
    });

});
app.get('/reportsubmit',function(req,res){
	res.sendFile('reportsubmit.html',{'root': __dirname + '/templates'});
});




app.post('/myaction', function(req, res) {
	var record = {email: req.body.email, pass: req.body.pass};

	//connection.connect();
	connection.query('INSERT INTO mytable1 SET ?', record, function(err,res){
		if(err) throw err;
		console.log('Last record insert id:', res.insertId);

	});
	res.redirect('/message');
	//connection.end();

	res.end();
});


app.post('/verifyuser', function(req, res){
	console.log('checking user in database');
	var selectString = 'SELECT COUNT(email) FROM mytable1 WHERE email="'+req.body.email+'" AND pass="'+req.body.pass+'" ';

	connection.query(selectString, function(err, results) {

		var string=JSON.stringify(results);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
        	user=req.body.email;
        	var token=randtoken.generate(16);
        	connection.query('UPDATE mytable1 SET sid="'+token+'"WHERE email="'+user+'"',function(err,res){
        		if(err) throw err;
        		console.log('Session id inserted in database');

        	});
        	res.cookie('sid' ,token,{maxAge : 600000});
        	res.redirect('/loggedin');

        }
        if (string === '[{"COUNT(email)":0}]')  {
        	res.redirect('/showSignInPageretry');

        }
    });



});

//Pushing submit report to database

app.post('/submitreport', function(req, res){
	console.log('Pushing submission to database');
  //alert("Your Response Has Been Recorded!");
  var founditem = {item: req.body.itname,descr: req.body.desc,fname: req.body.fname, email: req.body.email, phone: req.body.phnum ,foundon: reverseString(req.body.foundate)};

  //connection.connect();
  connection.query('INSERT INTO found SET ?', founditem, function(err,res){
  	if(err) throw err;
  	console.log('Last record insert id:', res.insertId);

  });




  res.redirect('/reportsubmit');
  //connection.end();

  res.end();
});



// **********FOUND******
app.set('view engine', 'ejs');
var obj = [];
app.get('/data', function(req, res){
	
	var selectString='SELECT COUNT(email) FROM mytable1 WHERE email="'+user+'" AND sid="'+req.cookies.sid+'" ';
	connection.query(selectString, function(err, results) {

        string=JSON.stringify(results);
        //this is a walkaround of checking if the email pass combination is 1 or not it will fail if wrong pass is given
        if (string === '[{"COUNT(email)":1}]') {
        	connection.query('SELECT * FROM found', function(err, result) {

        		if(err){
        			throw err;
        		} else {
        			obj = JSON.parse(JSON.stringify(result));
        			res.render('found', { obj: obj });
        		}
        	});
        }
        else {
        	res.sendFile('session.html',{'root': __dirname + '/templates'});
        }
        
    });


});
