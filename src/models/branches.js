module.exports = (conn, Sequelize) => {
	const branches = conn.define('branch', {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lat: {
			type: Sequelize.STRING,
			allowNull: false
		},
		log: {
			type: Sequelize.STRING,
			allowNull: false
		},
		open: {
			type: Sequelize.STRING,
			allowNull: false
		},
		close: {
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
	
	return branches;
}