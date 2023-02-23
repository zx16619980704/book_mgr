const Koa = require("koa");
const app = new Koa();

// 通过app.use注册中间件
// ctx上下文 当前请求的相关信息
app.use((ctx) => {
  const { request: req } = ctx;
  const { url } = req;
  if (url === "/user") {
    ctx.body = "user";
    return;
  }
  ctx.body = "??";
});

app.listen(3000, () => {
  console.log("启动成功");
});

console.log("123");
