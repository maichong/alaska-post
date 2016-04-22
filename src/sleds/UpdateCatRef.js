/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/13.
 * chaorong@maichong.it
 */

//'use strict';


import PostCat from '../models/PostCat';

/**
 * 更新分类父子关系
 */
export default class UpdateCatRef extends service.Sled {
  /**
   * @param {string|ObjectId} data.cat 父分类ID
   */
  async exec(data) {
    let cat = await PostCat.findById(data.cat);
    if (!cat) {
      return;
    }
    let subs = await PostCat.find({
      parent: cat._id
    });
    cat.subCats = subs.map(cat => cat._id);
    await cat.save();
  }
}
