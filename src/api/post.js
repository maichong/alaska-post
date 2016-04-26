/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/13.
 * chaorong@maichong.it
 */

import Post from '../models/Post';

//export async function list(ctx, next) {
//  await next();
//
//  let results = ctx.body.results;
//  if (results) {
//    ctx.body.results = results.map(p => {
//      if (p.user) {
//        p.user = p.user.pick('id', 'username', 'avatar');
//      }
//      return p;
//    });
//  }
//}

//修改点击(阅读)次数
export async function show(ctx, next) {
  await next();
  //修改点击(阅读)次数
  let query = Post.findById(ctx.state.id || ctx.params.id);
  let post = await query;
  post.hots++;
  post.save();
}
//获取相关联文章
export async function relations(ctx) {
  let postId = ctx.state.post || ctx.query.post;
  if (!postId) service.error(400);
  let postTarget = await Post.findCache(postId).populate('relations');
  if (!postTarget) return;
  ctx.body = postTarget.relations.map(
    post => post.data().pick('id', 'title', 'pic', 'hots', 'createdAt')
  );
}

