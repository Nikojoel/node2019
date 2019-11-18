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

app.get('/animal_notdb', async (req, res) => {
	console.log(req);
	//res.send(`query params?" ${req.query.moro}`);
	try {
		const [results] = await connection.query ("SELECT * FROM animal WHERE name LIKE ?", [req.query.name, req.query.family]);
		res.json(results);
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
