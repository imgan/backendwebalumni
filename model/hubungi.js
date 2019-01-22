const Sequelize = require('sequelize');

const sequelize = new Sequelize("alumni", "root", "", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Hubungi = sequelize.define("hubungi", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isEmail : true
    },
    isDeleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    pesan: {
        type: Sequelize.TEXT
    }
});

// force: true will drop the table if it already exists
// Hubungi.sync({ force: true }).then(() => {

// });