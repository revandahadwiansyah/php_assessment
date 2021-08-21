const DB = require('../models/index');

const Op = DB.Sequelize.Op;

//list all demands//
exports.getAll = (req, res) => {
	console.log('demands: getall')
	console.log(req.headers)
	console.log(req.body)
	
	let queries = `SELECT * FROM demand WHERE status = 1`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(!data[0].length){
				res.send({
					status: false,
					code: 104,
					msg: "RecordNotFound!"
				});
				return false;
			}
			
			res.send({
				status: true,
				code: 0,
				msg: "success",
				data: data[0]
			});
			return true;
		})
		.catch(err => {
			res.status(500).send({
				status: false,
				code: 1004,
				msg: err.message
			});
			return false;
		});
}

//find by id//
exports.findById = (req, res) => {
	console.log('branches: findById')
	console.log(req.headers)
	console.log(req.body)
	if(typeof req.body.id === 'undefined'){
		res.status(500).send({
			status: false,
			code: 1,
			msg: "InvalidParams"
		});
		return false;
	}
		
	//by id//
	let queries = `SELECT * FROM demand WHERE status = 1 AND id = ${req.body.id}`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(!data[0].length){
				res.send({
					status: false,
					code: 105,
					msg: "RecordNotFound!"
				});
				return false;
			}
			
			res.send({
				status: true,
				code: 0,
				msg: "success",
				data: data[0]
			});
			return true;
		})
		.catch(err => {
			res.status(500).send({
				status: false,
				code: 1005,
				msg: err.message
			});
			return false;
		});
}

// add //
exports.insertOne = (req, res) => {
	console.log('branches: findById')
	console.log(req.headers)
	console.log(req.body)
	
	if(typeof req.body.bid === 'undefined' ||
		typeof req.body.capacity === 'undefined' ||
		typeof req.body.price === 'undefined' ||
		typeof req.body.day === 'undefined' ||
		typeof req.body.start_time === 'undefined' ||
		typeof req.body.end_time === 'undefined'
	){
		res.status(500).send({
			status: false,
			code: 1,
			msg: "InvalidParams"
		});
		return false;
	}
	
	let queries = `INSERT INTO demand (bid, capacity, price, day, start_time, end_time)
					VALUES (${req.body.bid},${req.body.capacity},${req.body.price},${req.body.day},${req.body.start_time},${req.body.end_time})`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(data[1] != 1){
				res.send({
					status: false,
					code: 106,
					msg: "UnableToInsert"
				});
				return false;
			}
			
			res.send({
				status: true,
				code: 0,
				msg: "InsertCompleted"
			});
			return true;
		})
		.catch(err => {
			res.status(500).send({
				status: false,
				code: 1006,
				msg: err.message
			});
			return false;
		});
}

// updated //
exports.updated = (req, res) => {
	console.log('branches: findById')
	console.log(req.headers)
	console.log(req.body)
	
	if(typeof req.body.id === 'undefined' ||
		typeof req.body.bid === 'undefined' ||
		typeof req.body.capacity === 'undefined' ||
		typeof req.body.price === 'undefined' ||
		typeof req.body.day === 'undefined' ||
		typeof req.body.start_time === 'undefined' ||
		typeof req.body.end_time === 'undefined'
	){
		res.status(500).send({
			status: false,
			code: 1,
			msg: "InvalidParams"
		});
		return false;
	}
	
	let queries = `UPDATE demand SET
						bid = ${req.body.bid},
						capacity = ${req.body.capacity},
						price =  ${req.body.price},
						day =  ${req.body.day},
						start_time =  ${req.body.start_time},
						end_time =  ${req.body.end_time}
					WHERE status = 1 AND id =  ${req.body.id}`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(data[1].rowCount != 1){
				res.send({
					status: false,
					code: 107,
					msg: "RecordUpdatedNotFound!"
				});
				return false;
			}
			
			res.send({
				status: true,
				code: 0,
				msg: "UpdatedSuccess"
			});
			return true;
		})
		.catch(err => {
			res.status(500).send({
				status: false,
				code: 1007,
				msg: err.message
			});
			return false;
		});
}

// removed //
exports.removed = (req, res) => {
	console.log('branches: findById')
	console.log(req.headers)
	console.log(req.body)
	
	if(typeof req.body.id === 'undefined'){
		res.status(500).send({
			status: false,
			code: 1,
			msg: "InvalidParams"
		});
		return false;
	}
	
	let queries = `UPDATE demand SET
						status = 0
					WHERE status = 1 AND id =  ${req.body.id}`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(data[1].rowCount != 1){
				res.send({
					status: false,
					code: 108,
					msg: "RecordDeletedNotFound!"
				});
				return false;
			}
			
			res.send({
				status: true,
				code: 0,
				msg: "DeletedSuccess"
			});
			return true;
		})
		.catch(err => {
			res.status(500).send({
				status: false,
				code: 1008,
				msg: err.message
			});
			return false;
		});
}