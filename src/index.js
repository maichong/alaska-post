/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * chaorong@maichong.it
 */

import alaska from 'alaska';

/**
 * @class PostService
 */
class PostService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-post';
    super(options, alaska);
  }

  preLoadConfig() {
    let ADMIN = this.alaska.service('alaska-admin', true);
    if (ADMIN) {
      ADMIN._configDirs.push(this.dir + '/config/alaska-admin');
    }
  }
}

export default new PostService();
