module.exports = function (db, DataTypes) {
  const period = db.define("period", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    description: {
      type: DataTypes.STRING(2000),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return period;
};