module.exports = function (db, DataTypes) {
  return db.define("user_status", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    description: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true//"unique_user_status_description"
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};