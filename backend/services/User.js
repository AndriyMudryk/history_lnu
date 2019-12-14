const jwt = require("jsonwebtoken"); // Used to create, sign, and verify jwt tokens
const bcrypt = require("bcryptjs");// Used for cryptic operations
const fs = require("fs");
const path = require("path");

const rootPath = "../";
const utils = require(rootPath + "helpers/utils.js");
const logger = require(rootPath + "helpers/logger");
const config = require(rootPath + "config");
const validator = require(rootPath + "helpers/validators");
const {
  UnauthorizedError,
  ClientError,
  ServerError
} = require(rootPath + "helpers/Errors");
const db = require(rootPath + "sequelize/models");

const jwtSecret = config.jwtSecret;
const jwtExpires = config.jwtExpires;
const sequelizeOp = db.Sequelize.Op;
const limitPerPage = config.limitPerPage;
const photoDirectory = config.projectDir + "/" + config.tempDir;

// Ensure photo directory exists
if (!fs.existsSync(photoDirectory)) {
  fs.mkdirSync(photoDirectory);
}

const userDb = {
  getAuthentificatedUser(email) {
    return db.users.findAll({
      raw: true,
      where: {
        email: email
      }
    });
  },

  getUserInfo(id, email) {
    return db.users.findOne({
      raw: true,
      where: {
        [sequelizeOp.or]: [
          {
            id: id
          }, {
            email: email
          }
        ]
      }
    });
  }
};

function getAllUsers() {
  return db.users.findAll({
    attributes: [
      "id",
      "created",
      "email",
      "last_active",
      "locale",
      "name",
      "phone",
      "photo",
      "time_zone",
      "username",
      "status_id"
    ]
  });
}

function checkData(filterData) {
  let errors = {};

  if (typeof filterData !== "object") {
    errors.customError = "Empty filter data object.";
    return errors;
  }
  errors = utils.checkPaginationFilteringSortingProperties(filterData, limitPerPage);

  return errors;
}


// Some Business Logic
function checkUserLoginData(userDbData) {
  let errors = {};
  if (typeof userDbData !== "object") {
    errors.customError = "Empty userDbData object.";
    return errors;
  }
  let errorMessage = validator.isEmail(userDbData.email, {required: true});
  if (errorMessage !== null) {
    errors.email = errorMessage;
  }
  errorMessage = validator.isString(userDbData.password, {required: true, min: 2});
  if (errorMessage !== null) {
    errors.password = errorMessage || "This field is required as not empty string."; // If password === ""
  }
  return errors;
}

function getToken(userLoginData) {
  const checkResult = checkUserLoginData(userLoginData);

  if (!utils.isEmptyObject(checkResult)) {
    checkResult.isFieldsError = true;
    logger.error("[User] Error in getToken method. Wrong user data.\n" +
                  "[User] Data: " + JSON.stringify(userLoginData, null, 2) +
                  "\n[User] Check results: " + JSON.stringify(checkResult, null, 2));
    return Promise.reject(
      new UnauthorizedError(
        {
          code: "invalid_user_data",
          message: "The credentials provided are not valid",//"Invalid user input.",
          errors: checkResult,
          debugMessage: "[User] getToken: Error in checkResult. Details: Invalid user login data."
        }
      )
    );
  }

  const email = userLoginData.email;
  const password = userLoginData.password;
  const rememberMe = userLoginData.rememberMe;
  const ip = userLoginData.ip;
  return userDb.getAuthentificatedUser(email).then(
    function (usersDbData) {

      // Check user existence
      if (usersDbData.length === 0) {
        throw new UnauthorizedError(
          {
            code: "invalid_user",
            message: "Invalid user email.",
            debugMessage: "[User] getToken: Details: User with email `" + email + "` not found."
          }
        );
      }

      // Check activation status
      const userDbData = usersDbData[0];
      if (userDbData.status_id !== 2) {
        throw new UnauthorizedError(
          {
            code: "invalid_active_status",
            message: "User is not activated.",
            debugMessage: "[User] getToken: Details: Invalid status for user `" + email + "`."
          }
        );
      }

      // Check if not admin user has access
      // if (!userDbData.admin) {
      //   // TODO check user hospital access
      //   //if (!utils.isStringNumber(password)) {
      //     throw new UnauthorizedError(
      //       {
      //         code: "invalid_access_password",
      //         message: "Wrong user password. Password should contain numeric digits of hospitalId.",
      //         debugMessage: "[User] getToken: Invalid access password format for user `" + email + "`."
      //       }
      //     );
      //   //}

      //   return userDbData;
      // }

      // Check password for admin user
      if (!bcrypt.compareSync(password, userDbData.pass)) {
        throw new UnauthorizedError(
          {
            code: "invalid_password",
            message: "Wrong user password.",
            debugMessage: "[User] getToken: Invalid password for user `" + email + "`."
          }
        );
      }
      userDbData.redirectUrl = "/";
      return userDbData;
    }
  ).then(
    function (userDbData) {
      const payload = {
        ip: ip,
        id: userDbData.id,
        email: userDbData.email,
        admin: userDbData.admin ? 1 : 0 // just to save characters
        // Todo store useragent hash here for security reason
        //userId: ""
        //Are optional and are added only for granted users
        //hospitalId: userDbData.hospitalId
      };

      // Add hospitalId to the jwt payload object to be able to check user access on different routes
      const hospitalId = userDbData.hospitalId;
      if (hospitalId) {
        payload.hospitalId = hospitalId;
      }

      const accessToken = jwt.sign(payload, Buffer.from(jwtSecret, "base64"), {
        expiresIn: rememberMe === "true" ? jwtExpires * 30 : jwtExpires,
        //or exp option on payload //exp: Math.floor(Date.now() / 1000) + (60 * 60),
        algorithm: "HS256"//default HMAC SHA256
        //issuer: "NewAmingos";
        //jwtid: uuid();// Compute unique token id (require("uuid/v4");)
      });
      logger.log("[User] JWT: Success user login `" + email + "`; accessToken = `" + accessToken + "`. User details: " + JSON.stringify(userDbData));

      db.users.update({
        last_active: db.Sequelize.literal("CURRENT_TIMESTAMP")
      }, {
        where: {
          id: userDbData.id
        }
      });

      return {
        jwt: accessToken,
        redirectUrl: userDbData.redirectUrl
        //payload: jwt.verify(accessToken, Buffer.from(jwtSecret, "base64")) // Decoded payload
      };
    }
  );
}

function getCurrentUserInfo(request) {
  return getUserJwt(request).then(
    function (payload) {
      return userDb.getUserInfo(payload.id, payload.email);
    }
  );
}

function getUserJwt(request) {
  const accessToken = utils.getTokenFromRequest(request);
  let payload = null;
  try {
    payload = jwt.verify(accessToken, Buffer.from(jwtSecret, "base64"), {
      algorithms: ["HS256"]
    });
  } catch (error) {
    return Promise.reject(
      new UnauthorizedError(
        {
          code: "invalid_authorization",
          message: "Invalid user authorization.",
          error: error,
          debugMessage: "[User] getUserJwt: Details: Error in verifying jwt token",
          toLog: false
        }
      )
    );
  }
  return Promise.resolve(payload);
}

function getUsers(filterData) {
  const checkResult = checkData(filterData);
  const statusId = filterData.statusId;
  if (!utils.isEmptyObject(checkResult)) {
    checkResult.isFieldsError = true;
    logger.error("[User] Error in getUsers method. Invalid users filter data.\n" +
                  "[User] Data: " + JSON.stringify(filterData, null, 2) +
                  "\n[User] Check results: " + JSON.stringify(checkResult, null, 2));
    return Promise.reject(
      new ClientError(
        {
          code: "invalid_user_filter_data",
          message: "The users filter data are not valid",
          errors: checkResult,
          debugMessage: "[User] Error in getUsers method. Details: Invalid users filter data."
        }
      )
    );
  }

  const limit = filterData.perPage;
  const offset = (filterData.page - 1) * limit;
  return db.users.findAndCountAll({
    attributes: {
      include: [
        "id",
        "username",
        "name",
        "email",
        "status_id",
        [db.Sequelize.col("userStatus.description"), "status_description"],
        "admin",
        //"time_zone",
        //"locale",
        "photo",
        "photo_url",
        "last_active",
        "updated",
        "created"
      ]
    },
    include: [
      {
        model: db.user_status,
        as: "userStatus",
        attributes: ["description"]
      }
    ],
    where: {
      status_id: statusId,
      [sequelizeOp.or]: [
        db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("users.name")),
          {
            [sequelizeOp.like]: "%" + filterData.search.toLowerCase() + "%"
          }
        ),
        db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("users.username")),
          {
            [sequelizeOp.like]: "%" + filterData.search.toLowerCase() + "%"
          }
        ),
        db.Sequelize.where(db.Sequelize.fn("lower", db.Sequelize.col("users.email")),
          {
            [sequelizeOp.like]: "%" + filterData.search.toLowerCase() + "%"
          }
        )
      ]
    },
    order: [
      [filterData.sortColumn, filterData.sortDirection]
    ],
    limit: limit,
    offset: offset
  }).then(
    function (users) {
      return {
        count: users.count,
        rows: users.rows,
        columns: [
          {
            name: "id",
            label: "Id"
          }, {
            name: "photo",
            label: "Photo"
          }, {
            name: "name",
            label: "Name"
          }, {
            name: "username",
            label: "Username"
          }, {
            name: "email",
            label: "Email"
          }, {
            name: "updated",
            label: "Updated"
          }, /*{
            name: "status_description",
            label: "Status"
          },*/ {
            name: "admin",
            label: "Admin"
          }
        ]
      };
    }
  );
}

function activateDeactivateUser(userId, statusId, adminId) {
  const errorMessage = [];
  errorMessage.push(validator.isNumber(userId, {required: true}));
  errorMessage.push(validator.isNumber(statusId, {required: true}));
  if (errorMessage.some((value) => value !== null)) {
    const checkResult = {
      error: errorMessage,
      isFieldsError: true
    };
    logger.error("[User] Error in activateDeactivateUser method. Invalid user data.\n" +
                  "[User] Data: " + JSON.stringify(userId, null, 2) +
                  "\n[User] Check results: " + JSON.stringify(checkResult, null, 2));
    return Promise.reject(
      new ClientError(
        {
          code: "invalid_user_data",
          message: "The user data are not valid",
          errors: checkResult,
          debugMessage: "[User] Error in activateDeactivateUser method. Details: Invalid user data."
        }
      )
    );
  }

  const newStatus = statusId >= 2 ? 1 : 2;

  return db.users.update({
    status_id: newStatus,
    updated: db.Sequelize.literal("CURRENT_TIMESTAMP")
  }, {
    where: {
      id: userId
    }
  }).then(
    function () {
      return db.history.create({
        table: "users",
        row_id: userId,
        field: "status_id",
        action: "update",
        old_value: statusId,
        new_value: newStatus,
        changer_id: adminId
      });
    }
  );
}

function createUser(userData, imageBlob, user) {
  prepareData(userData);
  if (imageBlob) {
    return utils.promisifyFileRead({
      type: "ArrayBuffer",
      data: imageBlob
    }).then(
      function (buffer) {
        const fileName = userData.username + "." + imageBlob.type.split("/")[1];
        fs.writeFileSync(photoDirectory + "/" + fileName, buffer.target.nodeBufferResult);
        return createUserRecordDb(userData, fileName, "", user);
      }
    );
  }

  if (userData.photo_url.indexOf("http") !== -1) {
    const fileName = userData.username + "." + userData.photo_url.split("/").slice(-1).pop().split(".")[1];
    downloadFile(userData.photo_url, photoDirectory + "/" + fileName).catch(
      function (error) {
        logger.error(error);
      }
    );
    return createUserRecordDb(userData, "/" + fileName, userData.photo_url, user);
  }
  return createUserRecordDb(userData, "", "", user);
}

function createUserRecordDb(userData, image, photoUrl, user) {
  return db.users.create({
    username: userData.username,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    admin: userData.isAdmin,
    pass: "",
    status_id: 2,// 2 - Active (defaults: 1 - Blocked)
    creator_id: user.id,
    photo: image,
    photo_url: photoUrl
  }).then(
    function (result) {
      return db.history.create({
        table: "users",
        row_id: result.id,
        field: "all",
        action: "create",
        old_value: "none",
        new_value: JSON.stringify(result.dataValues),
        changer_id: user.id
      });
    }
  );
}

function updateUser(userData, imageBlob, user) {
  return db.users.findOne({
    where: {
      id: userData.userId
    }
  }).then(
    function (foundUser) {
      prepareData(userData);
      if (imageBlob) {
        return utils.promisifyFileRead({
          type: "ArrayBuffer",
          data: imageBlob
        }).then(
          function (buffer) {
            const fileName = userData.username + "." + imageBlob.type.split("/")[1];
            deletePhotoFromServer(foundUser.dataValues.photo);
            fs.writeFileSync(photoDirectory + "/" + fileName, buffer.target.nodeBufferResult);
            return updateUserRecordDb(userData, fileName, foundUser.dataValues.photo_url, user);
          }
        );
      }

      if (userData.photo_url.indexOf("http") !== -1) {
        const fileName = userData.username + "." + userData.photo_url.split("/").slice(-1).pop().split(".")[1];
        deletePhotoFromServer(foundUser.dataValues.photo);
        downloadFile(userData.photo_url, photoDirectory + "/" + fileName).catch(
          function (error) {
            logger.error(error);
          }
        );
        return updateUserRecordDb(userData, "/" + fileName, userData.photo_url, user);
      }
      return updateUserRecordDb(userData, foundUser.dataValues.photo, foundUser.dataValues.photo_url, user);
    }
  );
}

function updateUserRecordDb(userData, image, imageUrl, user) {
  const isAdmin = JSON.parse(userData.isAdmin);
  const userId = parseInt(userData.userId, 10);

  return db.users.findOne({
    where: {
      id: userId
    }
  }).then(
    function (foundUser) {
      return db.users.update({
        username: userData.username,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        admin: isAdmin,
        photo: image,
        photo_url: imageUrl,
        updated: db.Sequelize.literal("CURRENT_TIMESTAMP")
      }, {
        where: {
          id: userId
        }
      }).then(
        function () {
          return db.history.create({
            table: "users",
            row_id: userData.userId,
            field: "all",
            action: "update",
            old_value: JSON.stringify(foundUser),
            new_value: JSON.stringify(userData),
            changer_id: user.id
          });
        }
      );
    }
  );
}


function deletePhotoFromServer(photo) {
  try {
    if (!photo || photo.indexOf("/") === -1) {
      return;
    }
    fs.statSync("backend/photos" + photo);
    fs.unlinkSync("backend/photos" + photo);
  } catch (error) {

    logger.error("Type of error : ClientError. Code: cannot_delete_file.\nShort message: Cannot delete image file" +
                  "\n[User] Error in deletePhotoFromServer method. Details: cannot delete image file.");

    return;
  }
}

function getUser(userId) {
  const errorMessage = validator.isNumber(userId, {required: true});
  if (errorMessage !== null) {
    const checkResult = {
      userId: errorMessage,
      isFieldsError: true
    };
    logger.error("[User] Error in getUser method. Invalid user id.\n" +
                  "[User] userId: " + userId +
                  "\n[User] Check results: " + JSON.stringify(checkResult, null, 2));
    return Promise.reject(
      new ClientError(
        {
          code: "invalid_user_id",
          message: "The user id is not valid",
          errors: checkResult,
          debugMessage: "[User] Error in getUser method. Details: Invalid user id."
        }
      )
    );
  }

  return db.users.findOne({
    attributes: [
      "name",
      "username",
      "email",
      "phone",
      "photo",
      "photo_url",
      "admin"
    ],
    where: {
      id: userId
    }
  });
}

function sendDefaultUserPhoto(res) {
  const userPhotoImage = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#6A6E7C'><path d='M8.406 12.7c-2.885 1.3-4.978 4-5.344 7.3 0 1.1.833 2 1.938 2h14c1.105 0 1.938-.9 1.938-2-.366-3.3-2.459-6-5.344-7.3C14.945 14 13.583 15 12 15s-2.945-1-3.594-2.3zM17 7A5 5 0 1 1 7 7a5 5 0 1 1 10 0z'/><path d='M12 11a8.952 8.952 0 0 0-3.594.75A9.025 9.025 0 0 0 3.062 19c0 1.105.833 2 1.938 2h14c1.105 0 1.938-.895 1.938-2a9.027 9.027 0 0 0-5.344-7.25A8.955 8.955 0 0 0 12 11z'/></svg>";
  res.writeHead(200, {
    "Content-Type": "image/svg+xml",
    "Content-Length": userPhotoImage.length
  });
  res.end(userPhotoImage);
}

function getUserPhotoImage(res, userId) {
  const errorMessage = validator.isNumber(userId, {required: true});
  if (errorMessage !== null) {
    const checkResult = {
      userId: errorMessage,
      isFieldsError: true
    };
    logger.error("[User] Error in getUserPhotoImage method. Invalid user id.\n" +
                  "[User] userId: " + userId +
                  "\n[User] Check results: " + JSON.stringify(checkResult, null, 2));
    return Promise.reject(
      new ClientError(
        {
          code: "invalid_user_id",
          message: "The user id is not valid",
          errors: checkResult,
          debugMessage: "[User] Error in getUserPhotoImage method. Details: Invalid user id."
        }
      )
    );
  }

  return db.users.findOne({
    raw: true,
    attributes: [
      "photo",
      "username"
    ],
    where: {
      id: userId
    }
  }).then(
    function (user) {
      const userPhotoFileName = user.photo;
      if (!userPhotoFileName) {
        sendDefaultUserPhoto(res);
        return true;
      }

      //for old data
      if (userPhotoFileName.startsWith("http")) {
        const urlSplit = userPhotoFileName.split(".");
        const fileName = user.username + "." + urlSplit[urlSplit.length - 1];
        downloadFile(userPhotoFileName, photoDirectory + "/" + fileName).catch(
          function (error) {
            logger.error(error);
          }
        );

        sendDefaultUserPhoto(res);
        return db.users.update({
          photo: "/" + fileName,
          photo_url: userPhotoFileName
        },{
          where: {
            id: userId
          }
        });
      }

      const mime = {
        gif: "image/gif",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        svg: "image/svg+xml"
      };
      const filePath = photoDirectory + "/" + userPhotoFileName;
      const contentType = mime[path.extname(filePath).slice(1)];
      if (!contentType) {
        throw new ServerError(
          {
            code: "unsupported_image_extension",
            message: "Could not determine file content type. Type: " + path.extname(filePath).slice(1),
            debugMessage: "[User] Error in getUserPhotoImage method. File path: " + filePath
          }
        );
      }
      const fileReadStream = fs.createReadStream(filePath);
      fileReadStream.on("open", function () {
        res.set("Content-Type", contentType);
      });
      return utils.promisifyPipe(fileReadStream, res).catch(
        function (error) {
          throw new ServerError(
            {
              code: "cannot_read_image",
              message: "Could not find image file.",
              error: error,
              debugMessage: "[User] Error in getUserPhotoImage method. File path: " + filePath
            }
          );
        }
      );
    }
  );
}

function downloadFile(url, destination) {
  const fileWriteStream = fs.createWriteStream(destination);
  const lib = url.startsWith("https") ? require("https") : require("http");
  const urlStrings = url.split(".");
  const extension = urlStrings[urlStrings.length - 1];
  return new Promise((resolve, reject) => {
    if (extension !== "gif" && extension !== "jpeg" && extension !== "jpg" && extension !== "png") {
      reject(
        new ClientError(
          {
            code: "invalid_user_photo_url",
            message: "The user photo url is not valid",
            debugMessage: "[User] Error in downloadFile method. Details: Url is not valid. Url: " + url
          }
        )
      );

      fileWriteStream.close();
      fs.unlinkSync(destination);

      return;
    }
    lib.get(url, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new ServerError(
            {
              code: "invalid_user_photo_url",
              message: "The user photo url is not valid, bad response status code.",
              error: "Response status code: " + response.statusCode,
              debugMessage: "[User] Error in downloadFile method. Details: Failed to get image."
            }
          )
        );

        fileWriteStream.close();
        fs.unlinkSync(destination);

        return;
      }
      utils.promisifyPipe(response, fileWriteStream).then(
        function () {
          resolve();
        }
      ).catch(
        function (error) {
          reject(
            new ServerError(
              {
                code: "error_saving_file",
                message: "Error saving the file",
                error: error,
                debugMessage: "[User] Error in downloadFile method. Details: Error saving the file."
              }
            )
          );
        }
      );
    }).on("error", err => {
      fs.unlinkSync(destination);
      reject(
        new ServerError(
          {
            code: "no_connection",
            message: "No connection to server in downloadFile",
            error: err,
            debugMessage: "[User] Error in downloadFile method. Details: No connection to server."
          }
        )
      );
    }
    );
  });
}

function prepareData(userData) {
  const keys = Object.keys(userData);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (userData[key] === "null") {
      userData[key] = null;
    } else if (userData[key] === "undefined") {
      userData[key] = undefined;
    } else if (userData[key] === "NaN") {
      userData[key] = NaN;
    }
  }
}


module.exports = {
  getToken: getToken,
  getCurrentUserInfo: getCurrentUserInfo,
  getUserJwt: getUserJwt,
  getAllUsers: getAllUsers,
  activateDeactivateUser: activateDeactivateUser,
  createUser: createUser,
  updateUser: updateUser,
  getUser: getUser,
  getUserPhotoImage: getUserPhotoImage,
  sendDefaultUserPhoto: sendDefaultUserPhoto,
  getUsers: getUsers
};