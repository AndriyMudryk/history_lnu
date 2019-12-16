module.exports = function (db, DataTypes) {
  const period = db.define("period", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    period_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "period",
        key: "id"
      }
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return period;
};