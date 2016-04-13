/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * rong@maichong.it
 */

//'use strict';

export default class PostComment extends service.Model {

  static label = 'Post Comment';
  static defaultColumns = 'post,topic,user,commentCount,createdAt';
  static defaultSort = 'createdAt';
  static searchFields = 'post,content';
  static api = {
    list: 1,
    show: 1
  };
  static fields = {
    post: {
      label: 'Related Post',
      ref: 'Post'
    },
    topic: {
      label: 'Related Topic',
      ref: 'PostTopic'
    },
    user: {
      label: 'User',
      type: 'relationship',
      ref: 'user.User',
      noedit: true,
      index: true
    },
    content: {
      label: 'Content',
      type: String,
      default: ''
    },
    commentTo: {
      label: 'Reply Target Of Comment',
      ref: 'PostComment'
    },
    commentCount: {
      label: 'Comment Count',
      type: Number,
      default: 0
    },
    agree: {
      label: 'Agreed Count',
      type: Number,
      default: 0
    },
    oppose: {
      label: 'Opposed Count',
      type: Number,
      default: 0
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
