"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trip.belongsTo(models.country, {
        as: "countries",
        foreignKey: {
          name: "idCountry",
        },
      });
    }
  }
  trip.init(
    {
      title: DataTypes.STRING,
      idCountry: DataTypes.INTEGER,
      accomodation: DataTypes.STRING,
      transportation: DataTypes.STRING,
      eat: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
      night: DataTypes.STRING,
      dateTrip: DataTypes.DATE,
      price: DataTypes.INTEGER,
      available: DataTypes.INTEGER,
      quota: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "trip",
    }
  );
  return trip;
};
