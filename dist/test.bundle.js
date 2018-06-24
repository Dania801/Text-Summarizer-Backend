module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/appTest.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/constants.js":
/*!*********************************!*\
  !*** ./src/config/constants.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst devConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-dev',\n  JWT_SECRET: 'thisIsASecret'\n};\n\nconst testConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-test'\n};\n\nconst prodConfig = {\n  MONGO_URL: 'mongodb://localhost:27017/supreme-posts-prod'\n};\n\nconst defaultConfig = {\n  PORT: process.env.PORT || 3000,\n  JWT_SECRET: 'thisIsASecret'\n};\n\nfunction envConfig(env) {\n  switch (env) {\n    case 'development':\n      return devConfig;\n    case 'test':\n      return testConfig;\n    default:\n      return prodConfig;\n  }\n}\n\nexports.default = Object.assign({}, defaultConfig, envConfig(\"development\"));\n\n//# sourceURL=webpack:///./src/config/constants.js?");

/***/ }),

/***/ "./src/modules/articles/article.model.js":
/*!***********************************************!*\
  !*** ./src/modules/articles/article.model.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _slug = __webpack_require__(/*! slug */ \"slug\");\n\nvar _slug2 = _interopRequireDefault(_slug);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _pythonShell = __webpack_require__(/*! python-shell */ \"python-shell\");\n\nvar _pythonShell2 = _interopRequireDefault(_pythonShell);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst ArticleSchema = new _mongoose.Schema({\n  title: {\n    type: String,\n    trim: true,\n    required: [true, 'Title is required'],\n    minlength: [3, 'Title need to be longer'],\n    maxlength: [24, 'Title need to be shorter'],\n    unique: true\n  },\n  text: {\n    type: String,\n    trim: true,\n    required: [true, 'Text is required'],\n    minlength: [10, 'Text need to be longer']\n  },\n  summary: {\n    type: String,\n    trim: true,\n    minLength: [10, 'Summary need to be longer']\n  },\n  photo: {\n    type: String,\n    trim: true\n  },\n  slug: {\n    type: String,\n    trim: true,\n    lowercase: true\n  },\n  user: {\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  favouriteCount: {\n    type: Number,\n    default: 0\n  },\n  toReadFlag: {\n    type: Boolean,\n    default: false\n  }\n}, {\n  timestamps: true\n});\n\nArticleSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nArticleSchema.pre('validate', function (next) {\n  this._slugify();\n  next();\n});\n\nArticleSchema.methods = {\n  _slugify() {\n    this.slug = (0, _slug2.default)(this.title);\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      title: this.title,\n      text: this.text,\n      summary: this.summary,\n      createdAt: this.createdAt,\n      user: this.user,\n      favoriteCount: this.favoriteCount,\n      photo: this.photo\n    };\n  },\n  savePhoto(photo) {\n    _minio.minioClient.putObject('europetrip', photo.originalname, photo.buffer, \"application/octet-stream\", function (error, etag) {\n      if (error) {\n        return console.log(error);\n      }\n      console.log('File uploaded successfully.');\n    });\n    this.photo = photo.originalname;\n    this.save();\n  }\n};\n\nArticleSchema.statics = {\n  createArticle(args, user) {\n    return this.create(Object.assign({}, args, {\n      user\n    }));\n  },\n  list({\n    skip = 0,\n    limit = 5\n  } = {}) {\n    return this.find().sort({\n      createdAt: -1\n    }).skip(skip).limit(limit).populate('user');\n  },\n  summarizeText(post, title, text) {\n    console.log('inside summarizeText');\n    const shellOptions = {\n      pythonPath: '/usr/bin/python3',\n      pythonOptions: ['-u'],\n      args: [title, text]\n    };\n    const shell = new _pythonShell2.default('/Summarization/Engine/predicter.py', shellOptions);\n    shell.on('message', summary => {\n      console.log(summary);\n      post.summary = summary;\n      post.save();\n    });\n    shell.end((err, code, signal) => {\n      if (err) throw err;\n      console.log('The exit code was: ', code);\n      console.log('The exit signal was: ', signal);\n      console.log('python-shell has finished excuting');\n    });\n  },\n  incFavourite(articleId) {\n    return this.findByIdAndUpdate(articleId, { $inc: { favouriteCount: 1 } });\n  },\n  decFavourite(articleId) {\n    return this.findByIdAndUpdate(articleId, { $inc: { favouriteCount: -1 } });\n  },\n  addToRead(articleId) {\n    return this.findByIdAndUpdate(articleId, { toReadFlag: true });\n  },\n  removeToRead(articleId) {\n    return this.findByIdAndUpdate(articleId, { toReadFlag: false });\n  }\n};\n\nexports.default = _mongoose2.default.model('Article', ArticleSchema);\n\n//# sourceURL=webpack:///./src/modules/articles/article.model.js?");

/***/ }),

/***/ "./src/modules/users/user.model.js":
/*!*****************************************!*\
  !*** ./src/modules/users/user.model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _validator = __webpack_require__(/*! validator */ \"validator\");\n\nvar _validator2 = _interopRequireDefault(_validator);\n\nvar _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ \"bcrypt-nodejs\");\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _mongooseUniqueValidator = __webpack_require__(/*! mongoose-unique-validator */ \"mongoose-unique-validator\");\n\nvar _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);\n\nvar _minio = __webpack_require__(/*! ../../services/minio.services */ \"./src/services/minio.services.js\");\n\nvar _constants = __webpack_require__(/*! ../../config/constants */ \"./src/config/constants.js\");\n\nvar _constants2 = _interopRequireDefault(_constants);\n\nvar _article = __webpack_require__(/*! ../articles/article.model */ \"./src/modules/articles/article.model.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst UserSchema = new _mongoose.Schema({\n  email: {\n    type: String,\n    unique: true,\n    trim: true,\n    validate: {\n      validator(email) {\n        return _validator2.default.isEmail(email);\n      },\n      message: '{VALUE} is not a valid email!'\n    }\n  },\n  firstName: {\n    type: String,\n    trim: true\n  },\n  lastName: {\n    type: String,\n    trim: true\n  },\n  userName: {\n    type: String,\n    required: [true, 'User name is required'],\n    trim: true,\n    unique: true\n  },\n  photo: {\n    type: String,\n    trim: true\n  },\n  password: {\n    type: String,\n    trim: true,\n    minlength: [6, 'Password need to be longer']\n  },\n  twitter: {\n    id: String,\n    fullName: String,\n    screenName: String\n  },\n  favourites: {\n    articles: [{\n      type: _mongoose.Schema.Types.ObjectId,\n      ref: 'Article'\n    }]\n  },\n  toRead: {\n    articles: [{\n      type: _mongoose.Schema.Types.ObjectId,\n      ref: 'Article'\n    }]\n  },\n  followings: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  }],\n  followers: [{\n    type: _mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  }]\n}, {\n  timestamps: true\n});\n\nUserSchema.plugin(_mongooseUniqueValidator2.default, {\n  message: '{VALUE} already taken!'\n});\n\nUserSchema.pre('save', function (next) {\n  if (this.isModified('password')) {\n    this.password = this._hashPassword(this.password);\n  }\n  return next();\n});\n\nUserSchema.methods = {\n  _hashPassword(password) {\n    return (0, _bcryptNodejs.hashSync)(password);\n  },\n  authenticateUser(password) {\n    return (0, _bcryptNodejs.compareSync)(password, this.password);\n  },\n  createToken() {\n    return _jsonwebtoken2.default.sign({\n      _id: this._id\n    }, _constants2.default.JWT_SECRET);\n  },\n  toAuthJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      photo: this.photo,\n      twitter: this.twitter,\n      token: `JWT ${this.createToken()}`\n    };\n  },\n  toJSON() {\n    return {\n      _id: this._id,\n      userName: this.userName,\n      firstName: this.firstName,\n      lastName: this.lastName,\n      photo: this.photo\n    };\n  },\n  savePhoto(photo) {\n    _minio.minioClient.putObject('europetrip', photo.originalname, photo.buffer, \"application/octet-stream\", function (error, etag) {\n      if (error) {\n        return console.log(error);\n      }\n      console.log('File uploaded successfully.');\n    });\n    this.photo = photo.originalname;\n    this.save();\n  },\n  _favourites: {\n    async articles(articleId) {\n      if (this.favourites.articles.indexOf(articleId) >= 0) {\n        this.favourites.articles.remove(articleId);\n        await _article2.default.decFavourite(articleId);\n      } else {\n        this.favourites.articles.push(articleId);\n        await _article2.default.incFavourite(articleId);\n      }\n      return this.save();\n    },\n    isArticleIsFavourite(articleId) {\n      if (this.favourites.articles.indexOf(articleId) >= 0) {\n        return true;\n      }\n      return false;\n    }\n  },\n  _toRead: {\n    async articles(articleId) {\n      if (this.toRead.articles.indexOf(articleId) >= 0) {\n        this.toRead.articles.remove(articleId);\n        await _article2.default.removeToRead(articleId);\n      } else {\n        this.toRead.articles.push(articleId);\n        await _article2.default.addToRead(articleId);\n      }\n      return this.save();\n    }\n  },\n  _followings: {\n    async add(userId) {\n      if (this.followings.indexOf(userId) >= 0) {\n        console.log('removing user from following list');\n        this.followings.remove(userId);\n      } else {\n        console.log('adding new user to following list');\n        this.followings.push(userId);\n      }\n      this.save();\n    }\n  },\n  _followers: {\n    async add(userId) {\n      if (this.followers.indexOf(userId) >= 0) {\n        console.log('removing user from followers list');\n        this.followers.remove(userId);\n      } else {\n        console.log('adding new user to followers list');\n        this.followers.push(userId);\n      }\n      this.save();\n    }\n  }\n};\n\nUserSchema.statics = {\n  async checkFollower(currentId, followerId) {\n    const user = await this.findById(currentId);\n    user._followers.add(followerId);\n  }\n};\n\nexports.default = _mongoose2.default.model('User', UserSchema);\n\n//# sourceURL=webpack:///./src/modules/users/user.model.js?");

/***/ }),

/***/ "./src/services/minio.services.js":
/*!****************************************!*\
  !*** ./src/services/minio.services.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.minioClient = undefined;\n\nvar _minio = __webpack_require__(/*! minio */ \"minio\");\n\nconst minioClient = exports.minioClient = new _minio.Client({\n    endPoint: 'play.minio.io',\n    port: 9000,\n    secure: true,\n    accessKey: 'Q3AM3UQ867SPQQA43P2F',\n    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'\n});\n\n//# sourceURL=webpack:///./src/services/minio.services.js?");

/***/ }),

/***/ "./test/appTest.js":
/*!*************************!*\
  !*** ./test/appTest.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _user = __webpack_require__(/*! ../src/modules/users/user.model */ \"./src/modules/users/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet sinon = __webpack_require__(/*! sinon */ \"sinon\");\nlet chai = __webpack_require__(/*! chai */ \"chai\");\nlet mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nlet assert = __webpack_require__(/*! assert */ \"assert\");\nlet expect = chai.expect;\n\nbefore('Connecting to DB', function (done) {\n  mongoose.connect('mongodb://localhost:27017/supreme-posts-test');\n  mongoose.connection.once('open', () => {\n    console.log('connected to mongoDB');\n    mongoose.connection.collections.users.drop();\n    done();\n  }).on('error', err => {\n    throw err;\n  });\n});\n\ndescribe('Testing User Model', function () {\n\n  let user;\n\n  it('Creates a new user to test it', function (done) {\n    user = new _user2.default({\n      firstName: 'Dania',\n      lastName: 'Refaie',\n      email: 'test1234@gmail.com',\n      password: 'Helloworld123',\n      userName: 'Dani'\n    });\n    user.save().then(() => {\n      assert(!user.isNew);\n      done();\n    });\n  });\n\n  it('Modifies the created user', function (done) {\n    _user2.default.findOneAndUpdate({ _id: user._id }, { lastName: 'Ref' }, (err, record) => {\n      expect(record).to.not.be.undefined;\n      expect(record).to.be.an('object');\n      expect(record._id).to.not.be.undefined;\n      expect(record.userName).to.not.be.undefined;\n      expect(record.lastName).to.not.be.undefined;\n      expect(record.email).to.not.be.undefined;\n      expect(record.password).to.not.be.undefined;\n      expect(record.userName).to.not.be.undefined;\n      expect(record.email).to.match(/^.+@.+\\..+$/);\n      expect(record.password).to.be.a('string');\n      expect(record.firstName).to.be.a('string');\n      expect(record.lastName).to.be.a('string');\n      expect(record.userName).to.be.a('string');\n      expect(record.email).to.be.a('string');\n      expect(err).to.be.null;\n      done();\n    });\n  });\n\n  it('Finds the created user', function (done) {\n    _user2.default.findOne({ _id: user._id }, (err, record) => {\n      expect(record).to.not.be.undefined;\n      expect(record).to.be.an('object');\n      expect(record._id).to.not.be.undefined;\n      expect(record.userName).to.not.be.undefined;\n      expect(record.lastName).to.not.be.undefined;\n      expect(record.email).to.not.be.undefined;\n      expect(record.password).to.not.be.undefined;\n      expect(record.userName).to.not.be.undefined;\n      expect(record.email).to.match(/^.+@.+\\..+$/);\n      expect(record.password).to.be.a('string');\n      expect(record.firstName).to.be.a('string');\n      expect(record.lastName).to.be.a('string');\n      expect(record.userName).to.be.a('string');\n      expect(record.email).to.be.a('string');\n      expect(err).to.be.null;\n      done();\n    });\n  });\n\n  it('Deletes the created user', function (done) {\n    _user2.default.findOneAndRemove({ _id: user._id }, (err, record) => {\n      expect(record).to.not.be.undefined;\n      expect(record).to.be.an('object');\n      expect(err).to.be.null;\n      done();\n    });\n  });\n\n  it('Missing userName', function (done) {\n    user = new _user2.default({\n      firstName: 'Lukas',\n      lastName: 'Podoloski',\n      email: 'poldi1234@gmail.com',\n      password: 'Helloworld123'\n      //userName: 'Poldi'\n    });\n    user.save().then(() => {\n      assert(user.isNew);\n    });\n    done();\n  });\n\n  it('Invalid email', function (done) {\n    user = new _user2.default({\n      firstName: 'Lukas',\n      lastName: 'Podoloski',\n      email: 'poldi1234@.com',\n      password: 'Helloworld123',\n      userName: 'Poldi'\n    });\n    user.save().then(() => {\n      assert(user.isNew);\n    });\n    done();\n  });\n\n  it('Weak password', function (done) {\n    user = new _user2.default({\n      firstName: 'Lukas',\n      lastName: 'Podoloski',\n      email: 'poldi1234@gmail.com',\n      password: 'aaaaa123',\n      userName: 'Poldi'\n    });\n    user.save().then(() => {\n      assert(user.isNew);\n    });\n    done();\n  });\n\n  it('Short password', function (done) {\n    user = new _user2.default({\n      firstName: 'Lukas',\n      lastName: 'Podoloski',\n      email: 'poldi1234@gmail.com',\n      password: 'aa123',\n      userName: 'Poldi'\n    });\n    user.save().then(() => {\n      assert(user.isNew);\n    });\n    done();\n  });\n});\n\n//# sourceURL=webpack:///./test/appTest.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "bcrypt-nodejs":
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt-nodejs\");\n\n//# sourceURL=webpack:///external_%22bcrypt-nodejs%22?");

/***/ }),

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chai\");\n\n//# sourceURL=webpack:///external_%22chai%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "minio":
/*!************************!*\
  !*** external "minio" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"minio\");\n\n//# sourceURL=webpack:///external_%22minio%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-unique-validator":
/*!********************************************!*\
  !*** external "mongoose-unique-validator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-unique-validator\");\n\n//# sourceURL=webpack:///external_%22mongoose-unique-validator%22?");

/***/ }),

/***/ "python-shell":
/*!*******************************!*\
  !*** external "python-shell" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"python-shell\");\n\n//# sourceURL=webpack:///external_%22python-shell%22?");

/***/ }),

/***/ "sinon":
/*!************************!*\
  !*** external "sinon" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sinon\");\n\n//# sourceURL=webpack:///external_%22sinon%22?");

/***/ }),

/***/ "slug":
/*!***********************!*\
  !*** external "slug" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"slug\");\n\n//# sourceURL=webpack:///external_%22slug%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });