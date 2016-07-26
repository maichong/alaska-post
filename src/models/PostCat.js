/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * chaorong@maichong.it
 */

import _ from 'lodash';
import alaska from 'alaska';
import service from '../';

export default class PostCat extends alaska.Model {
  static label = 'Post Category';
  static icon = 'paperclip';
  static defaultColumns = '_id title parent sort createdAt';
  static defaultSort = '-sort';
  static searchFields = 'title';

  static autoSelect = false;

  static api = {
    list: 1
  };

  static relationships = {
    subs: {
      ref: 'PostCat',
      path: 'parent',
      title: 'Sub Categories'
    }
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
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
      default: 0,
      private: true
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
   * [async] 获取当前分类的子分类对象列表
   * @returns {[PostCat]}
   */
  async subs() {
    if (this.populated('subCats')) {
      return this.subCats;
    }
    return await PostCat.find({ parent: this._id });
  }

  /**
   * [async] 获取当前分类的所有子分类对象列表
   * @returns {{}}
   */
  async allSubs() {
    let list = await this.subs();
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
      let subsubs = await sub.allSubs();
      _.defaults(subs, subsubs);
    }
    return subs;
  }
}
