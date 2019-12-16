module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      username: {
        type: DataTypes.STRING(50),
        allowNull: false
      },

      name: {
        type: DataTypes.STRING(80),
        allowNull: false
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },

      pass: {
        type: DataTypes.CHAR(60),
        allowNull: false
      },

      status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references: {
          model: "user_status", // This is a reference to another model
          key: "id" // This is the column name of the referenced model
        }
      },

      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
      },

      updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
      },

      last_active: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
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
    }).then(
      function () {
        return queryInterface.addConstraint(
          "users",
          ["username"],
          {
            type: "unique",
            name: "unique_users_username"
          }
        );
      }
    ).then(
      function () {
        return queryInterface.addConstraint(
          "users",
          ["email"],
          {
            type: "unique",
            name: "unique_users_email"
          }
        );
      }
    ).then(
    /*  function () {
        return queryInterface.addConstraint(
          "users",
          ["phone"],
          {
            type: "unique",
            name: "unique_users_phone"
          }
        );
      }
    ).then(*/
      function () {
        return queryInterface.bulkInsert(
          "users",
          [
            {
              "id": 3,
              "username": "Andrew",
              "name": "Andrew Mudryk",
              "email": "mudrykandrew@gmail.com",
              "pass": "$2a$10$OiI2wG.SRhkSVB02i2a8xubSABX/WvsOww3tL5RD/KgzYofjd6uCW",//"am"
              "status_id": 2
            }
          ]
        );
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable("users");
  }
};