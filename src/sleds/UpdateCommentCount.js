/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/19.
 * chaorong@maichong.it
 */

import Post from '../models/Post';
import PostTopic from '../models/PostTopic';

/**
 * 更新文章或者专题评论总数
 */
export default class UpdateCommentCount extends service.Sled {
  /**
   * @param {string|ObjectId} data.id 文章Id
   */
  async exec(data) {
    let post = await Post.findById(data.id) || await PostTopic.findById(data.id);
    if (!post) {
      return;
    }
    post.commentCount++;
    await post.save();
  }
}
