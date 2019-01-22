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

const Kategori_berita = sequelize.define("kategori_berita", {
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
    },
    isAktif : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    }
});

// force: true will drop the table if it already exists
// Kategori_berita.sync({ force: true }).then(() => {

// });
module.exports = Kategori_berita;