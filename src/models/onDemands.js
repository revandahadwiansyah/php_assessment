module.exports = (conn, Sequelize) => {
	const onDemand = conn.define('demand', {
		bid: {
			type: Sequelize.STRING,
			allowNull: false
		},
		capacity: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.STRING,
			allowNull: false
		},
		day: {
			type: Sequelize.STRING,
			allowNull: false
		},
		start_time: {
			type: Sequelize.STRING,
			allowNull: false
		},
		end_time: {
			type: Sequelize.STRING,
			allowNull: false
		},
		status: {
			type: Sequelize.STRING,
			allowNull: false
		},
		created: {
			type: Sequelize.STRING,
			allowNull: false
		},
		updated: {
			type: Sequelize.STRING,
			allowNull: false
		}
	});
	
	return onDemand;
}