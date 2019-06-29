'use strict';

module.exports = (sequelize, DataTypes) => {

    var Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        tableName: 'categories',
        timestamps: true,
        paranoid: true,
    });

    Category.associate = (models) => {
        models.Category.belongsTo(models.User, {
            foreignKey: 'user_id',
            required: false
        });
    };

    return Category;
};