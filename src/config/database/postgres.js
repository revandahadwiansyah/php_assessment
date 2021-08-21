module.exports = {
	HOST: "localhost",
	USER: "postgres",
	PASSWORD: "111111",
	DB: "fatbellies",
	PORT: 5433,
	dialect: "postgres",
	pool: {
		max: 10,
		min: 1,
		acquire: 40000,
		idle: 10000
	}
};