'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * rong@maichong.it
 */

//'use strict';
class PostTag extends service.Model {
  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = PostTag;
PostTag.label = 'Post Tag';
PostTag.defaultColumns = 'title,createdAt';
PostTag.defaultSort = 'createdAt';
PostTag.searchFields = 'title';
PostTag.api = {
  list: 1,
  show: 1
};
PostTag.fields = {
  title: {
    label: 'Tag Name',
    type: String,
    require: true
  },
  createdAt: {
    label: 'Created At',
    type: Date
  }
};