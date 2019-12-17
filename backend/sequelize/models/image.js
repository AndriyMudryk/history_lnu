module.exports = function (db, DataTypes) {
  const image = db.define("image", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "event",
        key: "id"
      }
    },

    path: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return image;
};