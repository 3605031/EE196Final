const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const compression = require('compression');
const cors = require("cors")
const axios = require("axios");
const app = express();

var port = process.env.PORT || 3000;

require('dotenv').config();



// Redirect all HTTP traffic to HTTPS
function ensureSecure(req, res, next) {
  if (req.headers["x-forwarded-proto"] === "https") {
    // OK, continue
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
};

// Handle environments
if (process.env.NODE_ENV == 'production') {
  app.all('*', ensureSecure);
}

app.use(compression()); // Gzips file
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/public/index.html'));
});

app.post('/api', function (req, res) {
  const headers_config = {
    headers : {
    "content-type": "application/json",
    "app_id": "397a0edb",
    "app_key": "a1214f54d75f666a9eeb5f3375f77fb5",
    "cache-control": "no-cache"
    }
  };

  let image = req.body.image
  let name = req.body.name
  let sign_up = req.body.signup
  let sign_in = req.body.signin

  if(sign_in){
  axios.post('http://api.kairos.com/verify', {
    "image": image,
    "subject_id": name,
    "gallery_name": "EE196"
  }, headers_config)
    .then(function (response) {
      console.log(response)
      console.log("SUCCESS!!")
      console.log(response.data.images)
    })
    .catch(function (error) {
      console.log(error)
      console.log("ERRORR!!")
    })
  }

  if(sign_up){
    axios.post('http://api.kairos.com/enroll', {
    "image": image,
    "subject_id": name,
    "gallery_name": "EE196"
  }, headers_config)
    .then(function (response) {
      console.log(response)
      console.log("SUCCESS!!")
      console.log(response.data.images)
    })
    .catch(function (error) {
      console.log(error)
      console.log("ERRORR!!")
    })
  }


});


// Start the server
app.listen(port, function () {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", port, port);
});

