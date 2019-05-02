const { TestHelper } = require("uu_appg01_workspace-test");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { LIST_CREATE, ITEM_CREATE, ITEM_DELETE, mockDaoFactory} = require("../general-test-hepler");

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
    text: "new item text"
  };
  let itemCreated = await TestHelper.executePostCommand(ITEM_CREATE, data);
  let response = await TestHelper.executePostCommand(ITEM_DELETE,{id:itemCreated.id});
  let dtoOut = response;
  expect(response.status).toEqual(200);
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

  let deleteData = {
    id: item.id,
    unsupported : "some some awesome"
  };
  let response = await TestHelper.executePostCommand(ITEM_DELETE, deleteData);
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/item/deleteItem/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupported"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executePostCommand(ITEM_DELETE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/deleteItem/invalidDtoIn");
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
    delete : () => {
      throw new ObjectStoreError("it failed");
    }
  };
  try {
    await ItemModel.delete("awid", {id: "5cc98c71f400e0581c16ad62"});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/deleteItem/itemDaoDeleteFailed");
    expect(e.message).toEqual("Item delete failed.");
  }
});
