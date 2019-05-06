"use strict";
const Path = require("path");
const {Validator} = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const Errors = require("../errors/todo-list-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};

const DEFAULTS = {
  forceDelete: false,
  pageSize: 1000,
  pageIndex: 0
};

class TodoListModel {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "validation-types", "todo-list-types.js"));
    this.dao = DaoFactory.getDao("list");
    this.itemDao = DaoFactory.getDao("item");
  }

  async create(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("createListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.awid = awid;

    let list;
    try {
      list = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //A3
        throw new Errors.Create.listDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }


    list.uuAppErrorMap = uuAppErrorMap;
    return list;


  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("getListDtoInType", dtoIn);
    // HDS, A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );


    let list = await this.dao.get(awid, dtoIn.id);
    if (!list) {
      //A3
      throw new Errors.Get.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }


    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }

  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("updateListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    dtoIn.awid = awid;
    dtoIn.id = dtoIn.list;

    let list = await this.dao.get(awid, dtoIn.id);
    if (!list) {
      throw new Errors.Update.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }

    try {
      list = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //A3
        throw new Errors.Update.listDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }


    list.uuAppErrorMap = uuAppErrorMap;
    return list;


  }


  async delete(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("deleteListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS 1.4
    if (!dtoIn.forceDelete) dtoIn.forceDelete = DEFAULTS.forceDelete;
    dtoIn.awid = awid;

    let list = await this.dao.get(awid, dtoIn.id);
    if (!list) {
      throw new Errors.Delete.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }

    if (dtoIn.forceDelete) {
      let items = {};
      let count = await this.itemDao.countItemByList(awid, dtoIn.id);
      // HDS 2.3
      if (count > 0) {
        try {
          let filter = {
            list: dtoIn.id
          };
          items = await this.itemDao.listByListAndCompleted(awid, dtoIn, filter);
        } catch (e) {
          throw new Errors.Delete.itemDoesNotExist({uuAppErrorMap}, {id: dtoIn.id});
        }
        try {
          let filter = {
            _id: {
              $in: items.itemList
            }
          };
          // HDS 2.2, A4
          await this.itemDao.deleteMany(awid, filter);
        } catch (e) {
          throw new Errors.Delete.itemsDaoDeleteFailed({uuAppErrorMap}, {id: dtoIn.id});
        }
      }

    } else {
      // HDS 2.1, A3
      let count = await this.itemDao.countItemByList(awid, dtoIn.id);
      if (count > 0) {
        throw  new Errors.Delete.listNotEmpty({uuAppErrorMap}, {id: dtoIn.id});
      }
    }

    // HDS 3, A5
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.listDaoDeleteFailed({uuAppErrorMap}, {id: dtoIn.id});
    }
    return {uuAppErrorMap};
  }


  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("listListsDtoInType", dtoIn);
    // HDS, A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;

    let list = await this.dao.list(awid, "asc", dtoIn.pageInfo);

    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }


}

module.exports = new TodoListModel();
