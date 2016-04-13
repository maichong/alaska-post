/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/13.
 * rong@maichong.it
 */

//'use strict';
import PostCat from '../models/PostCat';
import Post from '../models/Post';

/**
 * 更新分类
 */
export default class UpdatePostCats extends service.Sled {
  /**
   * @param {string|ObjectId} data.cat 最后一级子分类ID
   */
  async exec(data) {
    let cats = [];
    let catTemp = await PostCat.findById(data.cat);
    catTemp && cats.push(catTemp);
    while (catTemp && catTemp.parent) {
      catTemp = await PostCat.findById(catTemp.parent);
      cats.push(catTemp);
    }
    if (!cats.length) {
      return;
    }
    let postData = await Post.findById(data._id);
    postData.cats = cats.map(cat => cat._id);
    await postData.save();
  }
}