"use strict";
const Path = require("path");
const {Validator} = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const Errors = require("../errors/todo-item-error.js");

const WARNINGS = {

  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }

};

const AUTHORITIES = "Authorities";
const EXECUTIVES = "Executives";

class TodoItemModel {

  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "validation-types", "todo-item-types.js"));
    this.dao = DaoFactory.getDao("item");
    this.daoList = DaoFactory.getDao("list");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);
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
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    let item = await this.dao.get(awid, dtoIn.id);
    console.log(item);
    if (!item) {
      //A3
      throw new Errors.Get.itemDoesNotExist(uuAppErrorMap, {Id: dtoIn.id});
    }


    item.uuAppErrorMap = uuAppErrorMap;
    return item;
  }




}

module.exports = new TodoItemModel();
