const Router = require("@koa/router");

// const { getBody } = require("../../helpers/utills");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const InviteCode = mongoose.model("InviteCode");

const router = new Router();
router.prefix = "/invite";

router.post("/add", async (ctx) => {
  const code = new InviteCode({
    code: uuidv4(),
    user: "",
  });
  const res = await code.save();
  ctx.body = {
    code: 1,
    data: res,
    msg: "创建成功",
  };
});

module.exports = router;
