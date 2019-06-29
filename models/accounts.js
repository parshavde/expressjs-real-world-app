'use strict';

module.exports = (sequelize, DataTypes) => {

    var Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER
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
        tableName: 'accounts',
        timestamps: true,
        paranoid: true,
    });

    Account.associate = (models) => {
        models.Account.belongsTo(models.User, {
            foreignKey: 'user_id',
            required: false
        });
    };

    return Account;
};