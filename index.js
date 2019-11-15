'use strict';

const express = require('express');
const connection = require('./module/db.js');

const app = express();

app.use(express.static('public'));

app.get('/animal', async (req, res) => {
	try {
		const [results, fields] = await connection.query('SELECT * FROM animal');
		console.log(results); // results contains rows returned by server
		console.log(fields); // fields contains extra meta data about results, if available
		res.json(results);
		//res.send('Hello from my Node server');
	} catch (e) {
		console.log(e);
	}
});

app.get('/demo', (req, res) => {
	res.send('demo');
});

app.listen(3000, () => {
	console.log('server app start?');
});
