'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('Hello from my Node server');
});

app.get('/demo', (req, res) => {
	res.send('demo');
});

app.listen(3000, () => {
	console.log('server app start?');
});
