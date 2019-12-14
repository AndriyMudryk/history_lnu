module.exports = function (db, DataTypes) {
  const users = db.define("users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true//"unique_users_username"
    },

    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true//"unique_users_email"
    },

    pass: {
      type: DataTypes.CHAR(60),
      allowNull: false
    },

    status_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "user_status", // This is a reference to another model
        key: "id" // This is the column name of the referenced model
      }
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
    },

    last_active: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP")
    }

    // Optional fields
    // phone: {
    //   type: DataTypes.STRING(80),
    //   allowNull: true,
    //   unique: true//"unique_users_phone"
    // },

    // time_zone: {
    //   type: DataTypes.STRING(50),
    //   allowNull: true
    // },

    // locale: {
    //   type: DataTypes.STRING(50),
    //   allowNull: true
    // },

    // last_active: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP")
    // },

    // photo: {
    //   type: DataTypes.TEXT,
    //   allowNull: true
    // },

    // photo_url: {
    //   type: DataTypes.TEXT,
    //   allowNull: true
    // }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  users.associate = function (models) {
    users.belongsTo(models.user_status, {
      as: "userStatus",
      foreignKey: "status_id",
      targetKey: "id"
    });
  };

  return users;
};