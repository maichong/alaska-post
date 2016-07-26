/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * chaorong@maichong.it
 */

import alaska from 'alaska';
import PostCat from './PostCat';

export default class Post extends alaska.Model {
  static label = 'Post';
  static icon = 'file-text-o';
  static defaultColumns = 'pic title cat user createdAt';
  static defaultSort = '-createdAt';
  static searchFields = 'title summary';

  static autoSelect = false;

  static api = {
    list: 1,
    show: 1
  };

  static populations = {
    tags: {},
    user: {
      select: '@tiny'
    },
    cat: {
      select: 'title'
    },
    relations: {
      select: '@tiny'
    }
  };

  static scopes = {
    tiny: 'title hots createdAt',
    list: 'title user summary pic tags commentCount hots createdAt'
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    user: {
      label: 'User',
      type: 'relationship',
      ref: 'alaska-user.User'
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
      label: 'Hots',
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
      if (this.cat) {
        let catTemp = await PostCat.findCache(this.cat);
        if (catTemp) {
          cats.push(catTemp);
        }
        while (catTemp && catTemp.parent) {
          catTemp = await PostCat.findCache(catTemp.parent);
          cats.push(catTemp);
        }
        cats = cats.map(cat => cat._id);
      }
      this.cats = cats;
    }
  }
}
