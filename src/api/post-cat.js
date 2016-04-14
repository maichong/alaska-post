/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/14.
 * rong@maichong.it
 */

import PostCat from '../models/PostCat';

//处理文章类目
export async function list(ctx) {
  let cats = await PostCat.find();
  let temps = [];
  if (cats && cats.length) {
    let maps = {};
    for (let n in cats) {
      let v = {};
      v.id = cats[n]._id;
      v.parent = cats[n].parent;
      v.title = cats[n].title;
      v.children = [];
      maps[v.id] = v;
    }
    for (let m in maps) {
      let c = maps[m];
      if (c.parent) {
        maps[c.parent].children.push(c);
      } else {
        temps.push(c);
      }
    }
  }
  ctx.body = temps;
}
