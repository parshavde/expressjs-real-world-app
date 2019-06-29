'use strict';

module.exports = (sequelize, DataTypes) => {

    var Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING, // Expanse or Income
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'transactions',
        timestamps: true,
        paranoid: true,
    });

    Transaction.associate = (models) => {
        models.Transaction.belongsTo(models.User, {
            foreignKey: 'user_id',
            required: false
        });
        models.Transaction.belongsTo(models.Category, {
            foreignKey: 'category_id',
            required: false
        });
        models.Transaction.belongsTo(models.Account, {
            foreignKey: 'account_id',
            required: false
        });
    };

    return Transaction;
};