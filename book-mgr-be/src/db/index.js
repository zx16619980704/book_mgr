const mongoose = require("mongoose");

// 给哪个数据库 哪个集合 什么格式的文档

// Schema Modal
const UserSchema = new mongoose.Schema({
  nickName: String,
  password: String,
  age: Number,
});

const UserModal = new mongoose.model("User", UserSchema);

const connect = () => {
  // 连接数据库
  mongoose.connect("mongodb://127.0.0.1:27017/book-mgr");
  // 监听数据库打开时事件
  mongoose.connection.on("open", () => {
    console.log("连接成功");

    // 创建文档
    const user = UserModal({
      nickName: "小红",
      password: "wwnic",
      age: 18,
    });

    // 保存 同步到 MongoDB
    user.save();
  });
};
connect();
