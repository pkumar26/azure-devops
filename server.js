'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World-v2!!\n');
});
app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);