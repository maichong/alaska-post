/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/13.
 * chaorong@maichong.it
 */

import Post from '../models/Post';

export async function list(ctx, next) {
  await next();

  let results = ctx.body.results;
  if (results) {
    ctx.body.results = results.map(p => {
      if (p.user) {
        p.user = p.user.pick('id', 'username', 'avatar');
      }
      return p;
    });
  }
}

//获取相关联文章
export async function relations(ctx) {
  console.log('postId', ctx.query.postId);
  let postId = ctx.query.postId;
  let postTarget = await Post.findById(postId).populate('relations');
  if (!postTarget) {
    service.error('Post not existed');
  }
  ctx.body = postTarget.relations.map(
    post => post.data().pick('id', 'title', 'pic', 'hots', 'createdAt')
  );
}

