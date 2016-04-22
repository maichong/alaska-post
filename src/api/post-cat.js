/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/14.
 * chaorong@maichong.it
 */

import PostCat from '../models/PostCat';

//处理文章类目
export async function all(ctx) {
  let cats = await PostCat.find();
  let map = {};
  cats = cats.map(c => {
    let data = c.data();
    data.subs = [];
    map[data.id] = data;
    return data;
  });

  cats.forEach(c => {
    if (c.parent && map[c.parent]) {
      map[c.parent].subs.push(c);
    }
  });

  ctx.body = cats.filter(c => {
    let parent = c.parent;
    delete c.parent;
    if (!c.subs.length) {
      delete c.subs;
    }
    return !parent;
  });
}
