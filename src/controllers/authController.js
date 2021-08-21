const DB = require('../models');
const Op = DB.Sequelize.Op;
const DEMANDS = DB.onDemands;

//login//
exports.login = (req, res) => {
	console.log('onDemands: getall')
	console.log(req.query)
	let params = req.query;
	
	DEMANDS.findAll({where: condition})
		.then(data => {res.send(data);})
		.catch(err => {
			res.status(500).send({
				code: 1011,
				msg: err.message
			});
		});
}

//logout//
exports.logout = (req, res) => {
	console.log('onDemands: find')
	console.log(req.query)
	let id = req.query.id;
	
	DEMANDS.findByPk(id)
		.then(data => {res.send(data);})
		.catch(err => {
			res.status(500).send({
				code: 1012,
				msg: err.message
			});
		});
}