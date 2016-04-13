'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PostCat = require('../models/PostCat');

var _PostCat2 = _interopRequireDefault(_PostCat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 脉冲软件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by Rong on 16/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * rong@maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

//'use strict';

/**
 * 更新分类父子关系
 */
class UpdateCatRef extends service.Sled {
  /**
   * @param {string|ObjectId} data.cat 父分类ID
   */
  exec(data) {
    return _asyncToGenerator(function* () {
      let cat = yield _PostCat2.default.findById(data.cat);
      if (!cat) {
        return;
      }
      let subs = yield _PostCat2.default.find({
        cat: cat._id
      });
      cat.subCats = subs.map(function (cat) {
        return cat._id;
      });
      yield cat.save();
    })();
  }
}
exports.default = UpdateCatRef;