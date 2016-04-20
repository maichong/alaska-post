/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * rong@maichong.it
 */

//'use strict';
import _ from 'lodash';

export default class PostCat extends service.Model {
  static label = 'Post Category';
  static defaultColumns = 'title,parent,sort,createdAt';
  static defaultSort = 'sort';
  static searchFields = 'title';
  static api = {
    list: 1
  };
  static relationships = [{
    ref: 'PostCat',
    path: 'parent',
    title: 'Sub Categories'
  }];

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
      default: 0
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
   * 获取当前分类的子分类对象列表
   * @returns {[PostCat]}
   */
  async subs() {
    if (this.populated('subCats')) {
      return this.subCats;
    }
    return await PostCat.find({ parent: this._id });
  }

  /**
   * 获取当前分类的所有子分类对象列表
   * @returns {[PostCat]}
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
