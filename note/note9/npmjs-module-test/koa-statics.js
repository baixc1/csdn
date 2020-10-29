const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
 
// $ GET /package.json
// app.use(serve('.'));
 
// $ GET /hello.txt
// app.use(serve('npmjs-module-test'));
 
// or use absolute paths
app.use(serve(__dirname));
 
app.listen(3002);
 
console.log('listening on port 3002');