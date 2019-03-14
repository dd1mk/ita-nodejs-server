const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const apirouter = require('./api/v1');
const apiv2router = require('./api/v2');

const { hostname, port } = config;

const app = express();

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v2', apiv2router);
app.use('/api', apirouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
