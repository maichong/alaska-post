/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/13.
 * chaorong@maichong.it
 */

import Post from '../models/Post';

//修改点击(阅读)次数
export async function show(ctx, next) {
  await next();

  //修改点击(阅读)次数
  if (ctx.body && ctx.body.getRecord) {
    let record = ctx.body.getRecord();
    if (record.isSelected('hots')) {
      record.hots++;
      record.save();
    }
  }
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

