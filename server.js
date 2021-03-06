'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6060
app.set('port', port)
const request = require('request');

// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//https://weekend-send-train.herokuapp.com/api/google-places/?
app.get('/api/google-places/*', (req, res) => {
  let apiCall = req.url.slice('/api/google-places/'.length)
  console.log(apiCall);
  let apiReq = `https://maps.googleapis.com/maps/api/place/nearbysearch/json${apiCall}`
  request.get(apiReq, (err, _, body) => {
    res.send(body)
  });
});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)