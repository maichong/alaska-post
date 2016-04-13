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
class PostTopic extends service.Model {
  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = PostTopic;
PostTopic.label = 'Post Topic';
PostTopic.defaultColumns = 'title,summary,seoTitle,createdAt';
PostTopic.defaultSort = 'createdAt';
PostTopic.searchFields = 'title,summary,seoTitle';
PostTopic.api = {
  list: 1,
  show: 1
};
PostTopic.fields = {
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