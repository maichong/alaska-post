/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/13.
 * rong@maichong.it
 */

import Post from '../models/Post';

//获取相关联文章
export async function relations(ctx) {
  let postId = ctx.query.postId;
  let postTarget = await Post.findById(postId).populate('relations');
  if (!postTarget) {
    service.error('Post not existed');
  }
  ctx.body = postTarget.relations.map(
    post => post.data().pick('id', 'title', 'pic', 'hots', 'createdAt')
  );
}

