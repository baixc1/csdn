const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor () {
    // 存放路径和中间件
    this.routes = []
  }

  /**
   * 路由与回调函数
   * @param {string} path
   * @returns {object} info - 路径和回调函数 
   */
  register (path) {
    const info = {};
    if (typeof path === 'string') {
      info.path = path;
      info.stack = slice.call(arguments, 1);
    } else {
      info.path = '/';
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  /**
   * use实例方法
   * @returns {void} 添加数据到all
   */
  use () {
    const info = this.register.apply(this, arguments);
    info.type = 'use'
    this.routes.push(info);
  }

  /**
   * get
   * @returns {void} 添加数据到get
   */
  get () {
    const info = this.register.apply(this, arguments);
    info.type = 'get'
    this.routes.push(info);
  }

  /**
   * post
   * @returns {void} 添加数据到post
   */
  post () {
    const info = this.register.apply(this, arguments);
    info.type = 'post'
    this.routes.push(info);
  }

  /**
   * 
   * @param {string} method 请求方法
   * @param {string} url 请求路径
   * @returns {Array} callbacks 匹配路由的回调函数
   */
  match (method, url) {
    let callbacks = [];
    if (url === '/favicon.ico') {
      return callbacks;
    }

    // 获取匹配路由
    this.routes.forEach(({ type, path, stack }) => {
      if (type === method || type === 'use') {
        if (url.startsWith(path)) {
          callbacks = callbacks.concat(stack); // stack可能是多个函数
        }
      }
    });
    return callbacks;
  }

  /**
   * next实现
   * @param {object} req 
   * @param {object} res 
   * @param {Array} stack 回调函数队列
   * @returns void
   */
  handle (req, res, stack) {
    const next = () => {
      const middleware = stack.shift();
      if (middleware) {
        middleware(req, res, next);
      }
    };
    next();
  }

  /**
   * 返回创建服务回调函数
   */
  callback () {
    /**
     * 监听请求
     * @param {object} req - 请求
     * @param {object} res - 响应
     * @return void
     */
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json');
        res.end(
          JSON.stringify(data)
        );
      };

      const url = req.url;
      const method = req.method.toLowerCase();
      console.log('callback:' + url)
      const resultList = this.match(method, url);
      this.handle(req, res, resultList);
    }
  }

  /**
   * 创建http服务
   * @param  {...any} args 
   */
  listen (...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = () => {
  return new LikeExpress()
};