module.exports = function (db, DataTypes) {
  const hospitals = db.define("hospitals", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true//"unique_hospitals_name"
    },

    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },

    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },

    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP")
    },

    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP")
    }

    // Optional
    // url: {
    //   type: DataTypes.STRING(500),
    //   allowNull: false
    // }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return hospitals;
};