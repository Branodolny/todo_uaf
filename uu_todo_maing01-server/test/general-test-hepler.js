const path = require("path");
const fs = require("fs");
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const TODO_INSTANCE_INIT = "init";
const TODO_INSTANCE_LOAD = "load";
const TODO_INSTANCE_UPDATE = "update";
const ITEM_CREATE = "item/create";
const ITEM_GET = "item/get";
const ITEM_UPDATE = "item/update";
const ITEM_DELETE = "item/delete";
const ITEM_LIST = "item/list";
const LIST_CREATE = "list/create";
const LIST_GET = "list/get";
const LIST_UPDATE = "list/update";
const LIST_DELETE = "list/delete";
const LIST_LIST = "list/list";
const MONGO_ID = "012345678910111213141516";


const mockDaoFactory = () => {
  // this mock ensures that all of the models can be required
  jest.spyOn(DaoFactory, "getDao").mockImplementation(() => {
    let dao = {};
    dao.createSchema = () => {};
    return dao;
  });
};

const getSessionMock = uuIdentity => {
  let identity = {
    getUuIdentity: () => uuIdentity,
    getName: () => {}
  };
  return {
    getIdentity: () => identity
  };
};

const getAuthzResultMock = () => {
  return {
    getAuthorizedProfiles: () => []
  };
};

module.exports = {
  TODO_INSTANCE_INIT,
  TODO_INSTANCE_LOAD,
  TODO_INSTANCE_UPDATE,
  ITEM_CREATE,
  ITEM_GET,
  ITEM_UPDATE,
  ITEM_DELETE,
  ITEM_LIST,
  LIST_CREATE,
  LIST_GET,
  LIST_UPDATE,
  LIST_DELETE,
  LIST_LIST,
  MONGO_ID,
  mockDaoFactory,
  getSessionMock,
  getAuthzResultMock
};
