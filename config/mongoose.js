const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://gunawan:123456@localhost:27017/wawan-mongoose?authSource=admin"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () => console.log("koneksi success"));