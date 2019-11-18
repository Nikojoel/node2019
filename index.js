'use strict';

const express = require('express');
const connection = require('./module/db.js');

const app = express();
const bodyParser = require('body-parser');

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

// HTTP GET
app.get('/animal_notdb', async (req, res) => {
	console.log(req);
	//res.send(`query params?" ${req.query.moro}`);
	try {
		const [results] = await connection.query ("SELECT * FROM animal WHERE name LIKE ?", [req.query.name]);
		res.json(results);
	} catch (e) {
		console.log(e);
	}
});

// HTTP POST
app.post('/animal_notdb', bodyParser.urlencoded(), async (req, res) => {
	try {
		const [result] = await connection.query('INSERT INTO animal (name) VALUES (?)', [req.body.name]);
		res.json(result);
	} catch (e) {
		console.log(e);
		res.send('db error');
	}
});

app.get('/demo', (req, res) => {
	res.send('demo');
});

app.listen(3000, () => {
	console.log('server app start?');
});
