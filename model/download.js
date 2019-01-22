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

const Download = sequelize.define("download", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAktif: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    isDeleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    filename: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
// Download.sync({ force: true }).then(() => {

// });