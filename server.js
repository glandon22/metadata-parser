var express = require('express');
var app = express();
var path = require('path');
//this line below is what renders my css with my html
app.use('/identification', express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.get("/", function(req,res) {
	res.render('default');
});

app.get('/identification', function(req, res) {
	var ip = req.ip;
	var lang = req.acceptsLanguages();
	var myReg = /[^,]*/;
	lang = myReg.exec(lang);
	var hardware = req.get('User-Agent');	
	var regExp = /\(([^)]+)\)/;
	var os = regExp.exec(hardware);
	os = os[1];

    res.render('index', {ip: ip, lang: lang, os: os});
});

app.listen(8080, function(req, res) {
    console.log("Parser is a go.");
});