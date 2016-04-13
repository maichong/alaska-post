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

class PostComment extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = PostComment;
PostComment.label = 'Post Comment';
PostComment.defaultColumns = 'post,topic,user,commentCount,createdAt';
PostComment.defaultSort = 'createdAt';
PostComment.searchFields = 'post,content';
PostComment.api = {
  list: 1,
  show: 1
};
PostComment.fields = {
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