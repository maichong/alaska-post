/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * chaorong@maichong.it
 */

import alaska from 'alaska';

export default class PostTag extends alaska.Model {
  static label = 'Post Tag';
  static icon = 'tags';
  static defaultColumns = 'title createdAt';
  static defaultSort = 'createdAt';
  static searchFields = 'title';

  static api = {
    list: 1,
    show: 1
  };

  static fields = {
    title: {
      label: 'Tag',
      type: String,
      required: true
    },
    createdAt: {
      label: 'Created At',
      type: Date,
      private: true
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
