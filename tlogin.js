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
	
	
	// res.write('<br/><br/><br/><br/>Request came: ');
	// res.write(req.query);

    res.end();
});

restService.post("/login", function (req, res) {
    //console.log(req.body);
    if (req.body.username == 'user' && req.body.password == 'password') {
        //var url = new URL(req);
		var client_id = "795562711541-0cmson2f0dtblc5i8o7s9sdsnnc0rl0i.apps.googleusercontent.com"
		var n = client_id.localeCompare(req.query.client_id);
		if(n==0)
		{
		res.redirect('https://tutorials.botsfloor.com/how-to-build-a-hello-world-alexa-skill-bcea0d01ee8f');
		}
		else res.redirect('https://www.google.com');
    }
    else {
        res.write('<script>alert("Invalid user");</script>');
        res.end();
    }
});

restService.listen(process.env.PORT || 9999);
