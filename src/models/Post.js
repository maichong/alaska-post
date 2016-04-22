/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * chaorong@maichong.it
 */

import PostCat from './PostCat';

export default class Post extends service.Model {
  static label = 'Post';
  static defaultColumns = 'title,pic,cat,summary';
  static defaultSort = 'createdAt';
  static searchFields = 'title,summary';
  static api = {
    list: 1,
    show: 1
  };
  static populations = [{
    path: 'tags topics user'
  }, {
    path: 'cat',
    nolist: true
  }, {
    path: 'relations',
    nolist: true
  }];
  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    user: {
      label: 'User',
      type: 'relationship',
      ref: 'user.User'
      //hidden: true
    },
    cat: {
      label: 'Post Category',
      ref: 'PostCat'
    },
    cats: {
      label: 'Categories',
      type: ['PostCat'],
      hidden: true,
      private: true
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

  async preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
    if (!this.seoTitle) {
      this.seoTitle = this.title;
    }
    if (this.cat) {
      let cats = [];
      let catTemp = await PostCat.findById(this.cat);
      catTemp && cats.push(catTemp);
      while (catTemp && catTemp.parent) {
        catTemp = await PostCat.findById(catTemp.parent);
        cats.push(catTemp);
      }
      if (!cats.length) {
        return;
      }
      this.cats = cats.map(cat => cat._id);
    }
  }
}
