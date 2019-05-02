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
    var s = fs.readFileSync('testlogin.ejs');
	
	s.client_id = req.client_id;
	s.state = req.state;
	s.response_type = req.response_type;
	s.redirect_uri = req.redirect_uri;
	
    res.write(fs.readFileSync('testlogin.ejs'));
    res.write('<br/><br/><br/><br/> Body: ');
    
	res.write(JSON.stringify(req.body));
	res.write('<br/><br/><br/><br/>Query: ');
    
	//console.log(req);
	res.write(JSON.stringify(req.query));
	
	
	// res.write('<br/><br/><br/><br/>Request came: ');
	// res.write(req.query);

    res.end();
});

restService.post("/login", function (req, res) {
    //console.log(req.body);
    if (req.body.username == 'user' && req.body.password == 'password') {
        		
		res.redirect('https://oauth-redirect.googleusercontent.com/r/oauth2-5a67a?code=abcdefgh&state=req.state');
    
	}
    else {
        res.write('<script>alert("Invalid user");</script>');
        res.end();
    }
});

restService.listen(process.env.PORT || 9999);
