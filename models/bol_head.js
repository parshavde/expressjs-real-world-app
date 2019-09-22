'use strict';

module.exports = (sequelize, DataTypes) => {

  var BolHead = sequelize.define('BolHead', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    carrier_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    carrier_duns: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    carrier_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    carrier_address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    carrier_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    consignee: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    consignee_address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    consignee_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    third_party_billing: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bol_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sid_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sac: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    freight_bill_pro_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    load_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    trailer_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    trailer_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    special_instructions1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shipper_internal_date: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    special_instructions2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cod_amount: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    cod_fee: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    total_amount_collected: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    carrier_signature: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
    tableName: 'bol_head',
    timestamps: true,
    paranoid: true,
  });

  BolHead.associate = (models) => {
    models.BolHead.belongsTo(models.User, {
      foreignKey: 'user_id',
      required: false
    });
  };

  return BolHead;
};