module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable("user_status", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      description: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    }).then(
      function () {
        return queryInterface.addConstraint(
          "user_status",
          ["description"],
          {
            type: "unique",
            name: "unique_user_status_description"
          }
        );
      }
    ).then(
      function () {
        return queryInterface.bulkInsert(
          "user_status",
          [
            {
              "id": 1,
              "description": "Blocked"
            }, {
              "id": 2,
              "description": "Active"
            }, {
              "id": 3,
              "description": "Unconfirmed"
            }
          ]
        );
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable("user_status");
  }
};