'use strict';

const express = require('express');
const animals = require('./module/animal.js');

const app = express();

if (process.env.SERVER === "dev_localhost") {
	require("./secure/localhost")(app);
} else {
	require("./secure/server")(app);
	app.listen(3000, () => {
		console.log('server app start?');
	});
}

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.get('/animals', async (req, res) => {
	try {
		res.json(await animals.getAll());
	} catch (e) {
		console.log(e);
	}
});

// HTTP GET
app.get('/animal', async (req, res) => {
	console.log(req);
	try {
		res.json(await animals.search(req.query.name));
	} catch (e) {
		console.log(e);

	}
});

// HTTP POST
app.post('/animal', bodyParser.urlencoded({extended: true}), async (req, res) => {
	try {
		res.json(await animals.insert(req.body.name));
	} catch (e) {
		console.log(e);
		res.send('db error');
	}
});

// HTTPS or HTTP check
app.get("/", (req, res) => {
	if (req.secure) {
		res.send("Hello secure");
	} else {
		res.send("Hello from my Node server")
	}
});

app.get('/demo', (req, res) => {
	res.send('demo');
});


