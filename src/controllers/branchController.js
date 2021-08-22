const DB = require('../models/index');

const Op = DB.Sequelize.Op;

//list branches only//
exports.branchList = (req, res) => {
	console.log('branches: getall')
	console.log(req.headers)
	console.log(req.body)
	
	let queries = `SELECT b.id, b.name
					FROM branch AS b
					ORDER BY b.id`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(!data[0].length){
				res.send({
					status: false,
					code: 100,
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
				code: 1000,
				msg: err.message
			});
			return false;
		});
}

//list all branches//
exports.getAll = (req, res) => {
	console.log('branches: getall')
	console.log(req.headers)
	console.log(req.body)
	
	let queries = `SELECT b.*, 
						bp.meal_name, bp.day, bp.start_time, bp.end_time,
						case when bp.capacity is null then d.capacity else  bp.capacity end as capacity,
						case when bp.price is null then d.price else  bp.price end as price
					FROM branch AS b
					LEFT JOIN branch_properties AS bp ON bp.bid = b.id AND bp.status = 1
					LEFT JOIN demand AS d ON d.bid = b.id AND b.status = 1
					WHERE b.status = 1
					GROUP BY b.id, bp.id, d.id
					ORDER BY b.id`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(!data[0].length){
				res.send({
					status: false,
					code: 101,
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
				code: 1001,
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
	
	let queries = `SELECT b.*, 
						bp.meal_name, bp.capacity, bp.price, bp.day, bp.start_time, bp.end_time,
						case when bp.capacity is null then d.capacity else  bp.capacity end as capacity,
						case when bp.price is null then d.price else  bp.price end as price
					FROM branch AS b
					LEFT JOIN branch_properties AS bp ON bp.bid = b.id AND bp.status = 1
					LEFT JOIN demand AS d ON d.bid = b.id AND b.status = 1
					WHERE b.status = 1`;
	
	//by id//
	queries += ` AND b.id = ${req.body.id}
				 GROUP BY b.id, bp.id, d.id
				 ORDER BY b.id`;
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(!data[0].length){
				res.send({
					status: false,
					code: 102,
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
				code: 1002,
				msg: err.message
			});
			return false;
		});
}

// search and sort //
exports.searchFilter = (req, res) => {
	console.log('branches: findById')
	console.log(req.headers)
	console.log(req.body)
	
	if(typeof req.body.id === 'undefined' ||
		typeof req.body.name === 'undefined' ||
		typeof req.body.lat === 'undefined' ||
		typeof req.body.log === 'undefined' ||
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
	
	let queries = `SELECT b.*, 
						bp.meal_name, bp.capacity, bp.price, bp.day, bp.start_time, bp.end_time,
						case when bp.capacity is null then d.capacity else  bp.capacity end as capacity,
						case when bp.price is null then d.price else  bp.price end as price
					FROM branch AS b
					LEFT JOIN branch_properties AS bp ON bp.bid = b.id AND bp.status = 1
					LEFT JOIN demand AS d ON d.bid = b.id AND b.status = 1
					WHERE b.status = 1`;
	
	//by branchId//
	if(req.body.id != 'false'){
		queries += ` AND b.id = ${req.body.id}`;
	}
	//by name//
	if(req.body.name != 'false'){
		queries += ` AND (b.name ILIKE '%${req.body.name}%' OR bp.meal_name ILIKE '%${req.body.name}%')`;
	}
	//by latitude and longitute//
	if(req.body.lat != 'false' && req.body.log != 'false'){
		queries+= ` AND b.lat <= ${req.body.lat} AND b.log <= ${req.body.log}`;
	}
	//by price//
	if(req.body.price != 'false'){
		queries+= ` AND (bp.price <= ${req.body.price} OR d.price <= ${req.body.price})`;
	}
	//by day//
	if(req.body.day != 'false'){
		queries+= ` AND (bp.day = ${req.body.day} OR d.day = ${req.body.day})`;
	}
	//by time//
	if(req.body.start_time != 'false' && req.body.end_time != 'false'){
		queries+= ` AND (bp.start_time >= ${req.body.start_time} OR d.start_time >= ${req.body.start_time})
					AND (bp.end_time < ${req.body.end_time} OR d.end_time < ${req.body.end_time})`;
	}
	
	queries += ` GROUP BY b.id, bp.id, d.id
				 ORDER BY b.id`;
	
	DB.conn.query(queries)
		.then((data, meta) => {
			console.log(data)
			console.log(meta)
			if(!data[0].length){
				res.send({
					status: false,
					code: 103,
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
				code: 1003,
				msg: err.message
			});
			return false;
		});
}