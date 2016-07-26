/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * chaorong@maichong.it
 */

import alaska from 'alaska';

export default class PostTopic extends alaska.Model {
  static label = 'Post Topic';
  static icon = 'hashtag';
  static defaultColumns = 'pic title summary commentCount hots createdAt';
  static defaultSort = 'createdAt';
  static searchFields = 'title summary';

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
    commentCount: {
      label: 'Comment Count',
      type: Number,
      default: 0
    },
    hots: {
      label: 'Hots',
      type: Number,
      default: 0
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
    if (!this.seoTitle) {
      this.seoTitle = this.title;
    }
  }
}
