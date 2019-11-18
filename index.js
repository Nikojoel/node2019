'use strict';

const express = require('express');
const animals = require('./module/animal.js');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.get('/animal', async (req, res) => {
	try {
		const results = await animals.getAll();
		res.json(results);
	} catch (e) {
		console.log(e);
	}
});

// HTTP GET
app.get('/animal_notdb', async (req, res) => {
	console.log(req);
	try {
		res.json(await animals.search(req.query.name));
	} catch (e) {
		console.log(e);

	}
});

// HTTP POST
app.post('/animal_notdb', bodyParser.urlencoded({extended: true}), async (req, res) => {
	try {
		res.json(await animals.insert(req.body.name));
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
