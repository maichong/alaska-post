/**
 * 脉冲软件
 * http://maichong.it
 * Created by Rong on 16/4/12.
 * rong@maichong.it
 */

//'use strict';

import alaska from 'alaska';

/**
 * @class PostService
 */
export default class PostService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-post';
    options.dir = __dirname;
    super(options, alaska);
  }

  preLoadConfig() {
    let ADMIN = this.alaska.service('alaska-admin', true);
    if (ADMIN) {
      ADMIN._configDirs.push(this.dir + '/config/alaska-admin');
    }
  }
}
