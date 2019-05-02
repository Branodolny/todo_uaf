"use strict";

const {UuObjectDao} = require("uu_appg01_server").ObjectStore;
const {ObjectId} = require("bson");

class ListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
    await super.createIndex({awid: 1, code: 1}, {unique: true});
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({awid, id});
  }

  async getByCode(awid, code) {
    return await super.findOne({awid, code});
  }

  async update(uuObject) {
    let filter = {id: uuObject.id, awid: uuObject.awid};
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async updateByCode(uuObject) {
    let filter = {code: uuObject.code, awid: uuObject.awid};
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    await super.deleteOne({awid, id});
  }

  async deleteByCode(awid, code) {
    await super.deleteOne({awid, id});
  }

  async list(awid, order, pageInfo) {
    let sort = {name: order === "asc" ? 1 : -1};
    return await super.find({awid}, pageInfo, sort);
  }


}

module.exports = ListMongo;
