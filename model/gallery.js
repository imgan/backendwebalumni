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

const Gallery = sequelize.define("gallery", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
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
    gambar: {
        type: Sequelize.STRING
    },
    keterangan : {
        type : Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
// Gallery.sync({ force: true }).then(() => {

// });