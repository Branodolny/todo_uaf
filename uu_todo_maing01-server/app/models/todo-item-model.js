"use strict";
const Path = require("path");
const {Validator} = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const Errors = require("../errors/todo-item-error.js");
const ErrorsList = require("../errors/todo-list-error.js");

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
  completeUnsupportedKeys: {
    code: `${Errors.Complete.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};
const DEFAULTS = {
  completed: true,
  pageSize: 1000,
  pageIndex: 0
};

class TodoItemModel {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "validation-types", "todo-item-types.js"));
    this.dao = DaoFactory.getDao("item");
    this.daoList = DaoFactory.getDao("list");
  }

  async create(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let list = await this.daoList.get(awid, dtoIn.list);
    if (!list) {
      throw new Errors.Create.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.list});
    }

    dtoIn.awid = awid;

    let item;
    try {
      item = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //A3
        throw new Errors.Create.itemDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }


    item.uuAppErrorMap = uuAppErrorMap;
    return item;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("getItemDtoInType", dtoIn);
    // HDS, A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );


    let item = await this.dao.get(awid, dtoIn.id);
    if (!item) {
      //A3
      throw new Errors.Get.itemDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }

    let returnItem = {
      item: item

    };
    returnItem.uuAppErrorMap = uuAppErrorMap;
    return returnItem;
  }

  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("updateItemDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    dtoIn.awid = awid;
    dtoIn.id = dtoIn.item;

    let list = await this.daoList.get(awid, dtoIn.list);
    if (!list) {
      throw new ErrorsList.Update.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.list});
    }
    let item = await this.dao.get(awid, dtoIn.item);
    if (!item) {
      throw new Errors.Update.itemDoesNotExist(uuAppErrorMap, {Id: dtoIn.item});
    }
    try {
      item = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //A3
        throw new Errors.Update.itemDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    let returnData = {
      item: item,
    };
    returnData.uuAppErrorMap = uuAppErrorMap;

    return returnData;
  }

  async complete(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("completeItemDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.completeUnsupportedKeys.code,
      Errors.Complete.InvalidDtoIn
    );
    dtoIn.awid = awid;
    dtoIn.id = dtoIn.item;
    //HDS 1.4
    if (dtoIn.complete == "undefined") {
      dtoIn.complete = DEFAULTS.completed;
    }
    let list = await this.daoList.get(awid, dtoIn.list);
    if (!list) {
      throw new ErrorsList.Update.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.list});
    }
    let item = await this.dao.get(awid, dtoIn.item);
    if (!item) {
      throw new Errors.Complete.itemDoesNotExist(uuAppErrorMap, {Id: dtoIn.item});
    }
    try {
      item = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //A3
        throw new Errors.Complete.itemDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    let returnData = {
      item: item,
    };
    returnData.uuAppErrorMap = uuAppErrorMap;

    return returnData;
  }

  async delete(awid, dtoIn) {
    //HDS 1
    let validationResult = this.validator.validate("deleteItemDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.id);
    if (!item) {
      throw new Errors.Delete.itemDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.itemDaoDeleteFailed({uuAppErrorMap}, e);
    }

    return {uuAppErrorMap};
  };

  async list(awid, dtoIn) {
    //HDS 1
    let validationResult = this.validator.validate("listItemsDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //HDD 1.4
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;


    let itemList = {};
    //HDS 2.1

    if (typeof dtoIn.completed !== 'undefined' && typeof dtoIn.list !== 'undefined') {
      let filter = {
        complete: dtoIn.completed,
        list: dtoIn.list
      };
      itemList = await this._calllistByListAndCompleted(awid, dtoIn, filter, uuAppErrorMap);
    } else if (typeof dtoIn.completed !== 'undefined' && typeof dtoIn.list == 'undefined') {
      //HDS 2.2
      let filter = {
        complete: dtoIn.completed,
      };

      itemList = await this._calllistByListAndCompleted(awid, dtoIn, filter, uuAppErrorMap);
    } else if (typeof dtoIn.list !== 'undefined' && typeof dtoIn.completed == 'undefined') {
      //HDS 2.3
      let filter = {
        list: dtoIn.list
      };
      itemList = await this._calllistByListAndCompleted(awid, dtoIn, filter, uuAppErrorMap);
    } else {
      //HDS .2.4
      try {
        itemList = await this.dao.list(awid, dtoIn);
      } catch (e) {
        throw new Errors.List.itemDaoListFailed({uuAppErrorMap}, e);
      }
    }


    itemList.uuAppErrorMap = uuAppErrorMap;
    return itemList;
  }

  async _calllistByListAndCompleted(awid, dtoIn, filter, uuAppErrorMap) {
    let itemList = {};
    try {
      itemList = await this.dao.listByListAndCompleted(awid, dtoIn, filter);
    } catch (e) {
      throw new Errors.List.itemDaoListFailed({uuAppErrorMap}, e);
    }
    return itemList;
  }


}

module.exports = new TodoItemModel();
