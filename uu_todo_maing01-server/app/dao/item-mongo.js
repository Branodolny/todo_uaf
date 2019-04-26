"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ItemMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, code: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async getCountByListId(awid, listId) {
    return await super.count({
      awid,
      list: ObjectId.isValid(listId) ? new ObjectId(listId) : listId
    });
  }
  async list(awid, order, pageInfo) {
    let sort = { name: order === "asc" ? 1 : -1 };
    return await super.find({ awid }, pageInfo, sort);
  }


}

module.exports = ItemMongo;
