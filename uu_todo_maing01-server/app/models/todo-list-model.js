"use strict";
const Path = require("path");
const {Validator} = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const Errors = require("../errors/todo-list-error.js");

const WARNINGS = {

  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }

};

const AUTHORITIES = "Authorities";
const EXECUTIVES = "Executives";
const DEFAULTS = {
  forceDelete: false,
};

class TodoListModel {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "validation-types", "todo-list-types.js"));
    this.dao = DaoFactory.getDao("list");
    this.itemDao = DaoFactory.getDao("item");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("createListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();

    if (
      !authorizedProfiles.includes(AUTHORITIES) &&
      !authorizedProfiles.includes(EXECUTIVES)
    ) {
      throw new Errors.Create.UserNotAuthorized({}, {state: 403});
    }

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
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    let list = await this.dao.get(awid, dtoIn.id);
    console.log(list);
    if (!list) {
      //A3
      throw new Errors.Get.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }


    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }

  async update(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("updateListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();

    if (
      !authorizedProfiles.includes(AUTHORITIES) &&
      !authorizedProfiles.includes(EXECUTIVES)
    ) {
      throw new Errors.Update.UserNotAuthorized({}, {state: 403});
    }

    dtoIn.awid = awid;
    dtoIn.id = dtoIn.list;

    let list = await this.dao.get(awid, dtoIn.id);
    console.log(list);
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

  async update(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("updateListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();

    if (
      !authorizedProfiles.includes(AUTHORITIES) &&
      !authorizedProfiles.includes(EXECUTIVES)
    ) {
      throw new Errors.Create.UserNotAuthorized({}, {state: 403});
    }

    dtoIn.awid = awid;
    dtoIn.id = dtoIn.list;

    let list = await this.dao.get(awid, dtoIn.id);
    console.log(list);
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

  async update(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("updateListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();

    if (
      !authorizedProfiles.includes(AUTHORITIES) &&
      !authorizedProfiles.includes(EXECUTIVES)
    ) {
      throw new Errors.Update.UserNotAuthorized({}, {state: 403});
    }

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

  async delete(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("deleteListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );


    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();

    if (
      !authorizedProfiles.includes(AUTHORITIES) &&
      !authorizedProfiles.includes(EXECUTIVES)
    ) {
      throw new Errors.Delete.UserNotAuthorized({}, {state: 403});
    }


    if (!dtoIn.forceDelete) dtoIn.forceDelete = DEFAULTS.forceDelete;
    dtoIn.awid = awid;

    let list = await this.dao.get(awid, dtoIn.id);
    if (!list) {
      throw new Errors.Delete.listDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }


    if (!dtoIn.forceDelete) {
      // hds 3.1
      let count;
      try {
        count = await this.itemDao.getCountByListId(awid, dtoIn.id);
      } catch (e) {
        //  A5
        if (e instanceof ObjectStoreError) {
          throw new Errors.Delete.ItemDaoGetCountByListFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      if (count !== 0) {
        // A6
        throw new Errors.Delete.listNotEmpty({ uuAppErrorMap }, {"Nr. items in ": count });
      }
    } else {
      // hds 3.2
      try {
        await this.itemDao.removeListsItems(awid, dtoIn.id);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          // A7
          throw new Errors.Delete.itemDaoDeleteFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }

    // hds 4
    await this.dao.delete(awid, dtoIn.id);

    // hds 5
    return { uuAppErrorMap };


  }


}

module.exports = new TodoListModel();
