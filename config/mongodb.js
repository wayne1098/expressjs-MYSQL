const { MongoClient } = require("mongodb");

const url = "mongodb://gunawan:123456@localhost:27017?authSource=admin";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("koneksi success");
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db("wawan-native");

module.exports = db;
