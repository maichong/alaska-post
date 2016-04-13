'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PostCat = require('../models/PostCat');

var _PostCat2 = _interopRequireDefault(_PostCat);

var _Post = require('../models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 脉冲软件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by Rong on 16/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * rong@maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

//'use strict';


/**
 * 更新分类
 */
class UpdatePostCats extends service.Sled {
  /**
   * @param {string|ObjectId} data.cat 最后一级子分类ID
   */
  exec(data) {
    return _asyncToGenerator(function* () {
      let cats = [];
      let catTemp = yield _PostCat2.default.findById(data.cat);
      catTemp && cats.push(catTemp);
      while (catTemp && catTemp.parent) {
        catTemp = yield _PostCat2.default.findById(catTemp.parent);
        cats.push(catTemp);
      }
      if (!cats.length) {
        return;
      }
      let postData = yield _Post2.default.findById(data._id);
      postData.cats = cats.map(function (cat) {
        return cat._id;
      });
      yield postData.save();
    })();
  }
}
exports.default = UpdatePostCats;