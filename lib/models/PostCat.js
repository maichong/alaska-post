'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 脉冲软件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by Rong on 16/4/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * rong@maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

//'use strict';


class PostCat extends service.Model {
  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
  postSave() {
    if (this.parent) {
      service.run('UpdateCatRef', { cat: this.parent });
    }
  }
  postRemove() {
    if (this.parent) {
      service.run('UpdateCatRef', { cat: this.parent });
    }
  }
  /**
   * 获取当前分类的子分类对象列表
   * @returns {[PostCat]}
   */
  subs() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.populated('subCats')) {
        return _this.subCats;
      }
      return yield PostCat.find({ parent: _this._id });
    })();
  }
  /**
   * 获取当前分类的所有子分类对象列表
   * @returns {[PostCat]}
   */
  allSubs() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let list = yield _this2.subs();
      if (!list.length) {
        return {};
      }
      let subs = {};
      for (let i in list) {
        let sub = list[i];
        if (subs[sub.id]) {
          continue;
        }
        subs[sub.id] = sub;
        let subsubs = yield sub.allSubs();
        _lodash2.default.defaults(subs, subsubs);
      }
      return subs;
    })();
  }
}
exports.default = PostCat;
PostCat.label = 'Post Category';
PostCat.defaultColumns = 'title,parent,sort,createdAt';
PostCat.defaultSort = '-sort';
PostCat.searchFields = 'title';
PostCat.api = {
  list: 1
};
PostCat.relationships = [{
  ref: 'PostCat',
  path: 'parent',
  title: 'Sub Categories'
}];
PostCat.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true
  },
  parent: {
    label: 'Parent Category',
    type: 'relationship',
    ref: 'PostCat',
    index: true
  },
  subCats: {
    label: 'Sub Categories',
    type: 'relationship',
    ref: 'PostCat',
    multi: true,
    hidden: true,
    private: true
  },
  sort: {
    label: 'Sort',
    type: Number,
    default: 0
  },
  createdAt: {
    label: 'Created At',
    type: Date
  }
};