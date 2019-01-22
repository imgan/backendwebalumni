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

const Kategori_album = sequelize.define("kategori_album", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kategori: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
// Kategori_album.sync({ force: true }).then(() => {
   
// });
module.exports = Kategori_album;