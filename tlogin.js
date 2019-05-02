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
	try{
    var a = fs.readFileSync('testlogin.ejs');
	//res.write(typeof(a)+'<br/>')
	var s=a.toString();
	//res.write(typeof(s)+'<br/><br/><br/>')
	
	if(typeof(req.query.client_id) !='undefined')
	{
		s=s.replace('$client_id',req.query.client_id+'');
	}
	if(typeof(req.query.state) !='undefined')
	{
		s=s.replace('$state',req.query.state+'');
	}
	if(typeof(req.query.response_type) !='undefined')
	{
		s=s.replace('$response_type',req.query.response_type+'');
	}
	if(typeof(req.query.redirect_uri) !='undefined')
	{
		s=s.replace('$redirect_uri',req.query.redirect_uri+'');
	}
	
	
    res.write(s);
    res.write('<br/><br/><br/><br/> Body: ');
    
	res.write(JSON.stringify(req.body));
	res.write('<br/><br/><br/><br/>Query: ');
    
	//console.log(req);
	res.write(JSON.stringify(req.query));
	
	
	// res.write('<br/><br/><br/><br/>Request came: ');
	// res.write(req.query);

    res.end();
	}catch(e)
	{
		res.write('Error occurred: '+e);
		res.end();
	}
});

restService.post("/login", function (req, res) {
    //console.log(req.body);
    if (req.body.username == 'user' && req.body.password == 'password') {
        
		try
		{
			var code= 'testcode'+(new Date()).getTime();
			var s=req.body.redirectUri+'?code='+code+'&state='+req.body.state;
			//res.write(s);
			//res.end();
			//res.redirect('https://oauth-redirect.googleusercontent.com/r/oauth2-5a67a?code=abcdefgh&state=req.state');
		    res.redirect(s);
		}
		catch(e)
		{
			res.write('Error occurred: '+e);
			res.end();
		}
    
	}
    else {
        res.write('<script>alert("Invalid user");</script>');
        res.end();
    }
});

restService.post("/token", function (req, res) {

	res.write(req.query);
	res.end();
	return res.json({
		"token_type": "Bearer",
		"access_token": "abcdefgh123",
		"refresh_token": "pqrs4567",
		"expires_in": 6000
	});

})

restService.listen(process.env.PORT || 9999);
