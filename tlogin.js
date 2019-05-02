const express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());
restService.get("/login", function (req, res) {
    res.write(fs.readFileSync('testlogin.ejs'));
    res.write('<br/><br/><br/><br/> Body: ');
    
	res.write(JSON.stringify(req.body));
	res.write('<br/><br/><br/><br/>Query: ');
    
	//console.log(req);
	res.write(JSON.stringify(req.query));
	
	
	res.write('<br/><br/><br/><br/>Request came: ');
	res.write(JSON.stringify(req));

    res.end();
});

restService.post("/login", function (req, res) {
    //console.log(req.body);
    if (req.body.username == 'user' && req.body.password == 'password') {
        //var url = new URL(req);
		res.redirect('https://www.google.com');
    }
    else {
        res.write('<script>alert("Invalid user");</script>');
        res.end();
    }
});

restService.listen(process.env.PORT || 9999);
