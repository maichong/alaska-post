/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * rong@maichong.it
 */

//'use strict';
export default class PostTopic extends service.Model {
  static label = 'Post Topic';
  static defaultColumns = 'title,summary,seoTitle,createdAt';
  static defaultSort = 'createdAt';
  static searchFields = 'title,summary,seoTitle';
  static api = {
    list: 1,
    show: 1
  };
  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    pic: {
      label: 'Main Picture',
      type: 'image'
    },
    summary: {
      label: 'Summary',
      type: String,
      default: ''
    },
    seoTitle: {
      label: 'SEO Title',
      type: String,
      default: ''
    },
    seoKeywords: {
      label: 'SEO Keywords',
      type: String,
      default: ''
    },
    seoDescription: {
      label: 'SEO Description',
      type: String,
      default: ''
    },
    template: {
      label: 'Page Template',
      type: String,
      default: ''
    },
    createdAt: {
      label: 'Created At',
      type: Date
    }
  };
  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
