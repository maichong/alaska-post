'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class PostService
 */
class PostService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-post';
    options.dir = __dirname;
    super(options, alaska);
  }
}
exports.default = PostService; /**
                                * 脉冲软件
                                * http://maichong.it
                                * Created by Rong on 16/4/12.
                                * rong@maichong.it
                                */

//'use strict';