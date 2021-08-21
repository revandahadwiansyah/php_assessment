module.exports = (conn, Sequelize) => {
	const branchProp = conn.define('branch_properties', {
		bid: {
			type: Sequelize.STRING,
			allowNull: false
		},
		meal_name: {
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
	
	return branchProp;
}