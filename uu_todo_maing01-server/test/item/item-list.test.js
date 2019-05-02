const {TestHelper} = require("uu_appg01_workspace-test");
const {LIST_CREATE, ITEM_LIST, ITEM_CREATE, ITEM_COMPLETE} = require("../general-test-hepler");

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

test("HDS list & completed", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
  expect(list.status).toEqual(200);
  let data = {
    list: list.id,
    text: "item text",
  };
  let item = await TestHelper.executePostCommand(ITEM_CREATE, data);
  expect(item.status).toEqual(200);
  data.item = item.id;
  let complete = await TestHelper.executePostCommand(ITEM_COMPLETE, data);
  expect(complete.status).toEqual(200);
  let listRequestData = {
    list: list.id,
    completed: true
  };
  let response = await TestHelper.executeGetCommand(ITEM_LIST, listRequestData);
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.itemList[0].id).toEqual(item.id);
  expect(dtoOut.uuAppErrorMap).toEqual({});
});


test("HDS list only", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
  expect(list.status).toEqual(200);
  let data = {
    list: list.id,
    text: "item text",
  };
  let item = await TestHelper.executePostCommand(ITEM_CREATE, data);
  expect(item.status).toEqual(200);
  let listRequestData = {
    list: list.id,
  };
  let response = await TestHelper.executeGetCommand(ITEM_LIST, listRequestData);
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.itemList[0].id).toEqual(item.id);
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("HDS completed only", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
  expect(list.status).toEqual(200);
  let data = {
    list: list.id,
    text: "item text",
  };
  let item = await TestHelper.executePostCommand(ITEM_CREATE, data);
  expect(item.status).toEqual(200);
  data.item = item.id;
  let complete = await TestHelper.executePostCommand(ITEM_COMPLETE, data);
  expect(complete.status).toEqual(200);
  let listRequestData = {
    completed: true
  };
  let response = await TestHelper.executeGetCommand(ITEM_LIST, listRequestData);
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.itemList[0].id).toEqual(item.id);
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("HDS without parameters", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
  expect(list.status).toEqual(200);
  let data = {
    list: list.id,
    text: "item text",
  };
  let item = await TestHelper.executePostCommand(ITEM_CREATE, data);
  expect(item.status).toEqual(200);
  let listRequestData = {};
  let response = await TestHelper.executeGetCommand(ITEM_LIST, listRequestData);
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.itemList[0].id).toEqual(item.id);https://www.google.com/search?q=thanos&oq=tha&aqs=chrome.0.69i59j69i61j69i57j69i60j69i61j0.1455j0j7&sourceid=chrome&ie=UTF-8
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
  let response = await TestHelper.executeGetCommand(ITEM_LIST, {list:item.id, unsupported:"text unsuported"});
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/item/listItem/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupported"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executeGetCommand(ITEM_LIST, {completed: "string"});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/listItem/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});


