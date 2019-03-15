// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/**my code**/
//test this link
// /api/timestamp/2015-12-25
// /api/timestamp/1450137600
//no date
app.get("/api/timestamp/", (req, res) => {
  //convert time to unixtimestamp
  let unixTimestamp = new Date().getTime();  
  //declare utc variable based on unixtimestamp
  let utcTimeStamp = new Date(unixTimestamp);
  //convert unix to utc(human readable form)
  utcTimeStamp = utcTimeStamp.toUTCString();
  
  //create objects
  let jsonDateObject = {
    "unix": unixTimestamp,
    "utc": utcTimeStamp
  };
  
  //return object
  res.json(jsonDateObject);   
});

//with dates
app.get("/api/timestamp/:date", (req, res) => {
  //convert time to unixtimestamp
  let unixTimestamp = new Date(req.params.date).getTime();  
  //declare utc variable based on unixtimestamp
  let utcTimeStamp = new Date(unixTimestamp);
  //convert unix to utc(human readable form)
  utcTimeStamp = utcTimeStamp.toUTCString();
  
  let  jsonDateObject = {
      "error": utcTimeStamp
    };
  
  //if date is invalid
  if(utcTimeStamp === "Invalid Date")
  {
    //convert to integer
    let convertToInt = parseInt(req.params.date);
    //convert epoch string to epoch date object
    unixTimestamp = new Date(convertToInt).getTime() * 1000;
    //declare utc variable based on unixtimestamp
    utcTimeStamp = new Date(unixTimestamp);
    //convert unix to utc(human readable form)
    utcTimeStamp = utcTimeStamp.toUTCString();
    console.log("invalid");  
    //create objects
    jsonDateObject = {
      "unix": unixTimestamp,
      "utc": utcTimeStamp
    };
  }
  else
  {
    //create objects
    jsonDateObject = {
      "unix": unixTimestamp,
      "utc": utcTimeStamp
    };
  }
  

  //return object
  res.json(jsonDateObject);       
});


/***my code**/



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});