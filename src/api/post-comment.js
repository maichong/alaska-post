/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/19.
 * rong@maichong.it
 */

import PostComment from '../models/PostComment';

//获取文章或者专题评论
export default async function(ctx) {
  let postId = ctx.query.postId;
  let topicId = ctx.query.topicId;
  let comments;
  if (postId) {
    comments = await PostComment.find({ post: postId }).populate('user commentTo');
  } else if (topicId) {
    comments = await PostComment.find({ topic: topicId }).populate('user commentTo');
  } else {
    service.error('system error');
  }

  if (!comments || !comments.length) {
    comments = [];
    //service.error('comments not existed');
  }
  ctx.body = comments.map(
    comment => comment.data()
  );
}
