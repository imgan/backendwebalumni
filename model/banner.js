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

const Banner = sequelize.define("banner", {
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
    isDeleted : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    },
    gambar : {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
// Banner.sync({ force: true }).then(() => {

// });