'use strict';
module.exports = (sequelize, DataTypes) => {

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  var defaultValue = new Date(year, month, 1);

  const Availability = sequelize.define('Availability', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    availability: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    month: {
      type: DataTypes.DATEONLY,
      defaultValue: defaultValue
    }
  }, {});
  Availability.associate = function(models) {
    // associations can be defined here
    Availability.belongsTo(models.Resources, {
      foreignKey: 'resourceId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Availability;
};