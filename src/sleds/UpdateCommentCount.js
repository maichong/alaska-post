/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/19.
 * rong@maichong.it
 */

import Post from '../models/Post';

/**
 * 更新分类父子关系
 */
export default class UpdateCommentCount extends service.Sled {
  /**
   * @param {string|ObjectId} data.id 文章Id
   */
  async exec(data) {
    let post = await Post.findById(data.id);
    if (!post) {
      return;
    }
    post.commentCount++;
    await post.save();
  }
}
