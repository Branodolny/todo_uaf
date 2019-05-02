const {TestHelper} = require("uu_appg01_workspace-test");
const {ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ITEM_CREATE, LIST_CREATE, ITEM_COMPLETE, mockDaoFactory} = require("../general-test-hepler");

beforeAll(async () => {
  await TestHelper.setup();
});

afterAll(() => {
  TestHelper.teardown();
});

beforeEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.initApp();
  await TestHelper.initAppWorkspace();
  await TestHelper.login("AwidOwner");
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("HDS", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let list = await TestHelper.executePostCommand(LIST_CREATE, {name:name});
  expect(list.status).toEqual(200);
  let data = {
    list:list.id,
    text: "item text"
  };
  let item = await TestHelper.executePostCommand(ITEM_CREATE, data);
  expect(item.status).toEqual(200);
  let updatedData = {
    item: item.id,
    list: list.id,
    text: "new item text",
    complete: false
  };
  let response = await TestHelper.executePostCommand(ITEM_COMPLETE, updatedData);
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.item.list).toEqual(updatedData.list);
  expect(dtoOut.item.item).toEqual(updatedData.item);
  expect(dtoOut.item.text).toEqual(updatedData.text);
  expect(dtoOut.item.complete).toEqual(true);
  expect(dtoOut.item.awid).toEqual(TestHelper.getAwid());
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("A1 - unsupported keys in dtoIn", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let list = await TestHelper.executePostCommand(LIST_CREATE, {name:name});
  expect(list.status).toEqual(200);
  let data = {
    list:list.id,
    text: "item text"
  };
  let item = await TestHelper.executePostCommand(ITEM_CREATE, data);
  expect(item.status).toEqual(200);
  let updatedData = {
    item: item.id,
    list: list.id,
    text: "new item text to update",
    unsupported: "fail"
  };
  let response = await TestHelper.executePostCommand(ITEM_COMPLETE, updatedData);
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/item/completeItem/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupported"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executePostCommand(ITEM_COMPLETE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/completeItem/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A3 - item ist not updated", async () => {
  mockDaoFactory();
  const ItemModel = require("../../app/models/todo-item-model");
  ItemModel.daoList = {
    get: ()=> {
      return {
        id:"5cc98c71f400e0581c16ad62",
        name: "list name"
      };
    }
  };
  ItemModel.dao = {
    get : () => {
      return {
        id:"5cc98c71f400e0581c16ad62",
        text: "name",
        list:"5cc98c71f400e0581c16ad62"
      };
    },
    update : () => {
      throw new ObjectStoreError("it failed");
    }
  };


  try {
    await ItemModel.complete("awid", {item: "5cc98c71f400e0581c16ad62", list: "5cc98c71f400e0581c16ad62", text: "name"});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/completeItem/itemDaoCompleteFailed");
    expect(e.message).toEqual("Item complete failed.");
  }
});
