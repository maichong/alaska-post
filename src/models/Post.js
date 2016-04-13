/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * rong@maichong.it
 */

//'use strict';
export default class Post extends service.Model {
  static label = 'Post';
  static defaultColumns = 'title,pic,cat,summary';
  static defaultSort = 'createdAt';
  static searchFields = 'title,summary';
  static api = {
    list: 1,
    show: 1
  };
  static fields = {
    title: {
      label: 'Title',
      type: String,
      require: true
    },
    cat: {
      label: 'Category',
      ref: 'PostCat'
    },
    cats: {
      label: 'Categories',
      type: ['PostCat'],
      hidden: true
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
    summary: {
      label: 'Summary',
      type: String,
      default: ''
    },
    pic: {
      label: 'Main Picture',
      type: 'image'
    },
    content: {
      label: 'Content',
      type: 'html',
      default: ''
    },
    tags: {
      label: 'Tags',
      type: ['PostTag']
    },
    author: {
      label: 'Author',
      type: String
    },
    source: {
      label: 'Source',
      type: String
    },
    commentCount: {
      label: 'Comment Count',
      type: Number,
      default: 0
    },
    hots: {
      label: 'Hots Count',
      type: Number,
      default: 0
    },
    recommend: {
      label: 'Recommend',
      type: Boolean
    },
    relations: {
      label: 'Related Posts',
      type: ['Post']
    },
    topics: {
      label: 'Related Topic',
      type: ['PostTopic']
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
  postSave() {
    if (this.cat) {
      service.run('UpdatePostCats', this);
    }
  }
}
