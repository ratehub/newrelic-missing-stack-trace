const express = require("express");
const indexHandler = require("./indexHandler");
const indexWithNodeFetchHandler = require("./indexWithNodeFetchHandler");


const app = express();

// Routes
app.get('/', indexHandler);
app.get('/node-fetch', indexWithNodeFetchHandler);

// Start listening
app.listen(3000, () => {
    console.info('Express server is now listening');
});