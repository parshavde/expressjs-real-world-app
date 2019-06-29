'use strict';

var PasswordHash = require('password-hash');

module.exports = (sequelize, DataTypes) => {

    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('password', PasswordHash.generate(val));
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
    });

    User.associate = (models) => {
        models.User.hasMany(models.Category, {
            foreignKey: 'user_id',
            required: false
        });
        models.User.hasMany(models.Account, {
            foreignKey: 'user_id',
            required: false
        });
        models.User.hasMany(models.Transaction, {
            foreignKey: 'user_id',
            required: false
        });
    };

    return User;
};