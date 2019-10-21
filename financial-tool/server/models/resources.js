'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resources = sequelize.define('Resources', {
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
    name: DataTypes.STRING,
    comment: DataTypes.STRING,
    main_cluster: DataTypes.STRING,
    main_apps: DataTypes.STRING,
    rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00,
      validate: {
        isFloat: true
      }
    },
    skills: DataTypes.STRING
  }, {});
  Resources.associate = function(models) {
    // associations can be defined here
    Resources.hasMany(models.Availability, {
      foreignKey: 'resourceId',
      as: 'availabilities'
    });
  };
  return Resources;
};