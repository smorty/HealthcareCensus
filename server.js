var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
app.use(function(req, res, next){
	res.setHeader('Connection', 'close');
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var Sequelize = require('sequelize');
var sequelize = new Sequelize('healthcare_census', 'root', null, {
	host: 'localhost',
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to the database:', err)
		} else {
			console.log('Connection has been established successfully.')
		}
	});

var Census = sequelize.define('Census', {
	CenterNo: Sequelize.INTEGER,
	Center: Sequelize.STRING,
	Date: Sequelize.DATE,
	Census: Sequelize.FLOAT
});

try {
sequelize
	.sync()
	.complete(function(err){
		if (!!err) {
			console.log('An error occurred while creating the table:', err)
		} else {
			console.log('It worked!')
		}
	});
}
catch (err) {
	console.log("There was a problem:" + err);
}

app.route('/')
	.get(function(req, res){
		console.log(req.query);
		Census
			.find({ where: ['Center=? and Date LIKE ?', req.query.Center, "%"+req.query.Date+"%"]})
				.success(function(data) {
					console.log('Data:'+data);
					res.send(data);
				});
	})
	.post(function(req, res){
		Census
			.create({
			    CenterNo: req.body.CenterNo,
				Center: req.body.Center,
				Date: req.body.Date,
				Census: req.body.Census
			})
			.complete(function(err, data) {
				console.log(data);
			    res.send(data);
			});
	});

app.route('/delete')
	.get(function(req, res){
		console.log(req.query);
		Census
			.find({ where: ['Center=? and Date LIKE ?', req.query.Center, "%"+req.query.Date+"%"]})
				.success(function(data) {
					data.destroy().on('success', function(){
						res.send('Row deleted');
					})
				});
	});

var server = app.listen(9001, function(){
	console.log(server.address());
 	console.log('listening on port %d', server.address().port);
});