module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable("image", {
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
    }).then(
      function () {
        return queryInterface.bulkInsert(
          "image",
          [
            {
              "id": 1,
              "event_id": 1,
              "path": "period_1/1.jpg",
              "title": "Кардинал Станіслав Гозій приводить єзуїтів до Польщі"
            }, {
              "id": 2,
              "event_id": 2,
              "path": "period_1/2.jpg",
              "title": "Іван Виговський"
            }, {
              "id": 3,
              "event_id": 3,
              "path": "period_1/3.jpg",
              "title": "Гадяцька угода 1658 р.. Фрагмент"
            }, {
              "id": 4,
              "event_id": 4,
              "path": "period_1/4.jpg",
              "title": "Король Ян ІІ Казімеж"
            }, {
              "id": 5,
              "event_id": 5,
              "path": "period_1/5.jpg",
              "title": "Привілей короля Яна ІІ Казимира. Краків, 20 січня 1661. Фрагмент обляти у книзі Коронної метрики"
            }, {
              "id": 6,
              "event_id": 6,
              "path": "period_1/6.jpg",
              "title": "Львівський єзуїтський костел і університет"
            }, {
              "id": 7,
              "event_id": 7,
              "path": "period_1/7.jpg",
              "title": "Король Август ІІІ"
            }, {
              "id": 8,
              "event_id": 8,
              "path": "period_1/8.jpg",
              "title": "Папа Климентій ХІІI"
            }, {
              "id": 9,
              "event_id": 9,
              "path": "period_1/9.jpg",
              "title": "Печатка ректора Львівського університету."
            }, {
              "id": 10,
              "event_id": 10,
              "path": "period_1/10.jpg",
              "title": "Підтвердження переліку курсів, які прослухав у Львівському університеті студент П. Освецімський. 1755. НБ ЛНУ."
            }, {
              "id": 11,
              "event_id": 11,
              "path": "period_1/11.jpg",
              "title": "Богдан Хмельницький."
            }
          ]
        );
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable("image");
  }
};