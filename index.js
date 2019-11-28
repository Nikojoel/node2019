'use strict';

const express = require('express');
const animals = require('./module/animal.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(require('express-session')({ secret: 'secret', resave: true, saveUninitialized: true }));

passport.use(new LocalStrategy(
	function(username, password, done) {
		//usermondel.findUser SELECT * FROM wop_user WHERE username = ?, (username)
		if (username !== 'test' || !bcrypt.compareSync(password,
			'$2a$12$/i9Pqig1qUVierBuNFTBteWo6LrfjpGZSF1XAV2pAMPvxEyGlzDBC')) {
			console.log('login', 'wrong username or password');
			return done(null, false);
		}
		return done (null, {username: username});
		/*
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (!user.verifyPassword(password)) { return done(null, false); }
			return done(null, user);
		});
		 */
	}
));

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((username, done) => {
	done(null, {username: username});
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
	passport.authenticate('local', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect('/');
	});
app.post('/register', (req, res) => {
	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(req.body.password, salt);
	// INSERT INTO user (name, email, password) VALUES (?,?,?), req.body.name, req.body.email, hash
	console.log('NEVER DO THAT', hash);
	res.send('account succesfully created');
});

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


