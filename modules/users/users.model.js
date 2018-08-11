const Sequelize = require('sequelize');
module.exports = (db) => {
    return db.define('user', {
        uid: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        firstname: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(64),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        pic: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        gender: {
            type: Sequelize.STRING(1),
            allowNull: false,
            validate: {
                isIn: [['m', 'f']],
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        zipcode: {
            type: Sequelize.STRING(32),
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING(32),
            allowNull: true,
        },
        country: {
            type: Sequelize.STRING(32),
            allowNull: true,
        },
        birthday: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        phone: {
            type: Sequelize.STRING(64),
            allowNull: true,
        },
        refererId: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
        utm: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    })
}