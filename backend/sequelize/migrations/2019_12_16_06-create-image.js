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
            "path": "period_1/11.png",
            "title": "Богдан Хмельницький."
          }, {
            "id": 12,
            "event_id": 12,
            "path": "period_2/1.jpg",
            "title": "Ілюстрована частина Акта про відкриття Львівського університету. 1784."
          }, {
            "id": 13,
            "event_id": 12,
            "path": "period_2/2.jpg",
            "title": "Імператор Йосиф II"
          }, {
            "id": 14,
            "event_id": 12,
            "path": "period_2/3.jpg",
            "title": "Імператор Франц І"
          }, {
            "id": 15,
            "event_id": 12,
            "path": "period_2/4.png",
            "title": "Імператор Франц Йосиф І"
          }, {
            "id": 16,
            "event_id": 16,
            "path": "period_2/5.jpg",
            "title": "Ректорське і деканські берла (скіпетри)."
          }, {
            "id": 17,
            "event_id": 16,
            "path": "period_2/6.jpg",
            "title": "Антін Ангелович"
          }, {
            "id": 18,
            "event_id": 16,
            "path": "period_2/7.png",
            "title": "Засідання Головної Руської Ради на чолі з Григорієм Яхимовичем. 1848"
          }, {
            "id": 19,
            "event_id": 16,
            "path": "period_2/8.jpg",
            "title": "Яків Головацький"
          }, {
            "id": 20,
            "event_id": 16,
            "path": "period_2/9.jpg",
            "title": "Юзеф Більчевський"
          }, {
            "id": 21,
            "event_id": 17,
            "path": "period_2/10.jpg",
            "title": "Корпус Львівського університету на вул. Краківській"
          }, {
            "id": 22,
            "event_id": 17,
            "path": "period_2/11.jpg",
            "title": "Корпус Львівського університету на вул. св. Миколая (тепер М. Грушевського)"
          }, {
            "id": 23,
            "event_id": 17,
            "path": "period_2/12.jpg",
            "title": "Корпус Львівського університету на вул. Длугоша (тепер Кирила і Мефодія)"
          }, {
            "id": 24,
            "event_id": 17,
            "path": "period_2/13.jpg",
            "title": "Корпуси медичного факультету Львівського університету на вул. Пекарській"
          }, {
            "id": 25,
            "event_id": 17,
            "path": "period_2/14.jpg",
            "title": "Приміщення бібліотеки Львівського університету на вул. Мохнацького(тепер М. Драгоманова)"
          }, {
            "id": 26,
            "event_id": 18,
            "path": "period_2/15.jpg",
            "title": "Маркіян Шашкевич"
          }, {
            "id": 27,
            "event_id": 18,
            "path": "period_2/15a.jpg",
            "title": "Обкладинка альманаху “Русалка Дністровая”"
          }, {
            "id": 28,
            "event_id": 18,
            "path": "period_2/16.jpg",
            "title": "Францішек Стронський"
          }, {
            "id": 29,
            "event_id": 18,
            "path": "period_2/17.jpg",
            "title": "Пожежа приміщень львівської ратуші та університету. Листопад 1848"
          }, {
            "id": 30,
            "event_id": 18,
            "path": "period_2/18.png",
            "title": "Біля Львівського університету"
          }, {
            "id": 31,
            "event_id": 18,
            "path": "period_2/19.jpg",
            "title": "Адам Коцко"
          }, {
            "id": 32,
            "event_id": 32,
            "path": "",
            "title": ""
          }, {
            "id": 33,
            "event_id": 19,
            "path": "period_2/20.png",
            "title": "Михайло Вербицький"
          }, {
            "id": 34,
            "event_id": 19,
            "path": "period_2/21.jpg",
            "title": "Лесь Курбас"
          }, {
            "id": 35,
            "event_id": 19,
            "path": "period_2/22.png",
            "title": "Олена Степанів"
          }, {
            "id": 36,
            "event_id": 19,
            "path": "period_2/23.jpg",
            "title": "Євген Петрушевич"
          }, {
            "id": 37,
            "event_id": 19,
            "path": "period_2/24.jpg",
            "title": "Йосиф Сліпий"
          }, {
            "id": 38,
            "event_id": 19,
            "path": "period_2/25.png",
            "title": "Іван Франко (у центрі) – студент філософського факультету Львівського університету"
          }, {
            "id": 39,
            "event_id": 20,
            "path": "period_2/26.jpg",
            "title": "Бальтазар Акé (Гакет)"
          }, {
            "id": 40,
            "event_id": 20,
            "path": "period_2/27.jpg",
            "title": "Петро Лодій"
          }, {
            "id": 41,
            "event_id": 21,
            "path": "period_2/28.png",
            "title": "Меморіальна таблиця на корпусі Львівського університету (Університетська, 1) з нагоди 150-річчя кафедри руської (української) словесності. 1998"
          }, {
            "id": 42,
            "event_id": 21,
            "path": "period_2/29.png",
            "title": "Францішек Ксаверій Ліске"
          }, {
            "id": 43,
            "event_id": 21,
            "path": "period_2/30.png",
            "title": "Михайло Грушевський"
          }, {
            "id": 44,
            "event_id": 22,
            "path": "period_2/31.png",
            "title": "Степан Рудницький"
          }, {
            "id": 45,
            "event_id": 23,
            "path": "period_2/32.jpg",
            "title": "Мар’ян Смолуховський"
          }, {
            "id": 46,
            "event_id": 24,
            "path": "period_2/33.png",
            "title": "Бенедикт Дибовський"
          }, {
            "id": 47,
            "event_id": 25,
            "path": "period_2/34.png",
            "title": "Людвік Фінкель"
          }, {
            "id": 48,
            "event_id": 25,
            "path": "period_3/35.jpg",
            "title": "Генрик Сенкевич"
          }, {
            "id": 49,
            "event_id": 25,
            "path": "period_2/36.png",
            "title": "Марія Склодовська-Кюрі"
          }, {
            "id": 50,
            "event_id": 25,
            "path": "period_2/37.png",
            "title": "Професори Львівського університету. 1912"
          }, {
            "id": 51,
            "event_id": 26,
            "path": "period_2/38.jpg",
            "title": "Адольф Бек"
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
