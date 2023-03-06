const Router = require("@koa/router");

const { getBody } = require("../../helpers/utills");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const InviteCode = mongoose.model("InviteCode");

const router = new Router();
router.prefix = "/auth";

router.post("/register", async (ctx) => {
  const { account, password, inviteCode } = getBody(ctx);
  // 表单校验
  if (account === "" || password === "" || inviteCode === "") {
    ctx.body = {
      code: 0,
      msg: "字段不能为空",
      data: null,
    };
    return;
  }
  // 根据传递过来的inviteCode，查询邀请码是否存在
  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec();
  // 邀请码不正确，响应失败
  if (!findCode || findCode.user) {
    ctx.body = {
      code: 0,
      msg: "邀请码不正确",
      data: null,
    };
    return;
  }
  // 根据传递过来的account，查询用户是否存在
  const findUser = await User.findOne({
    account,
  }).exec();
  // 用户存在，响应失败
  if (findUser) {
    ctx.body = {
      code: 0,
      msg: "已存在该用户",
      data: null,
    };
    return;
  }
  // 创建一个新的用户
  const user = new User({
    account,
    password,
  });
  // 同步到MongoDB数据库
  const res = await user.save();
  findCode.user = res._id;
  findCode.meta.updateAt = new Date().getTime();
  await findCode.save();
  // 响应成功
  ctx.body = {
    code: 1,
    msg: "注册成功",
    data: res,
  };
});

router.post("/login", async (ctx) => {
  const { account, password } = getBody(ctx);
  if (account === "" || password === "") {
    ctx.body = {
      code: 0,
      msg: "字段不能为空",
      data: null,
    };
    return;
  }
  const one = await User.findOne({
    account,
  }).exec();
  if (!one) {
    ctx.body = {
      code: 0,
      msg: "账号或密码错误",
      data: null,
    };
    return;
  }
  const user = {
    account: one.account,
    _id: one._id,
  };
  if (one.password === password) {
    ctx.body = {
      code: 1,
      msg: "登陆成功",
      data: {
        user: user,
        token: jwt.sign(user, "book-mgr"),
      },
    };
    return;
  }
  ctx.body = {
    code: 0,
    msg: "账号或密码错误",
    data: null,
  };
});

module.exports = router;
