module.exports = function(sequelize, DataTypes) {
		var User = sequelize.define('User', {
				username: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false,
					unique: true,
					validate:{
						isEmail: true,
					}
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false
				}
		 });

	return User;
}