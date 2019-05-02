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
	
	s=s.replace('$client_id',req.query.client_id);
	s=s.replace('$state',req.query.state);
	s=s.replace('$response_type',req.query.response_type);
	s=s.replace('$redirect_uri',req.query.redirect_uri);
	
	
    res.write(s);
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
        var code= 'testcode'+(new Date()).getTime();
		var s=req.body.redirect_uri+'/r/oauth2-5a67a?code='+code+'&state='+req.body.state;
		res.write(s);
		res.end();
		//res.redirect('https://oauth-redirect.googleusercontent.com/r/oauth2-5a67a?code=abcdefgh&state=req.state');
		// res.redirect(s);
    
	}
    else {
        res.write('<script>alert("Invalid user");</script>');
        res.end();
    }
});

restService.listen(process.env.PORT || 9999);
