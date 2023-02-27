require("./Schemas/User");
const mongoose = require("mongoose");

const connect = () => {
  return new Promise((resolve) => {
    // 连接数据库
    mongoose.connect("mongodb://127.0.0.1:27017/book-mgr");
    // 监听数据库打开时事件
    mongoose.connection.on("open", () => {
      console.log("连接成功");
      resolve();
    });
  });
};

module.exports = {
  connect,
};
