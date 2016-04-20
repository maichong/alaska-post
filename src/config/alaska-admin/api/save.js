/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/20.
 * rong@maichong.it
 */

export default async function (ctx, next) {
  let serviceId = ctx.state.service || ctx.query.service;
  let modelName = ctx.state.model || ctx.query.model;
  if (ctx.user && serviceId === 'alaska-post' && modelName === 'Post') {
    let data = ctx.state.data || ctx.request.body;
    if (!data.user) {
      data.user = ctx.user._id;
    }
    ctx.state.data = data;
  }
  await next();
}
