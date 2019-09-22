'use strict';

module.exports = (sequelize, DataTypes) => {

  var BolItemDetail = sequelize.define('BolItemDetail', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bol_head_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    item_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    quantity: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    packging: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(100),
        allowNull: true
    },
    hm: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'bol_item_detail',
    timestamps: true,
    paranoid: true,
  });

  BolItemDetail.associate = (models) => {
    models.BolItemDetail.hasMany(models.User, {
      foreignKey: 'bol_head_id',
      required: false
    });
  };

  return BolItemDetail;
};