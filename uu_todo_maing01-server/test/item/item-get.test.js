const { TestHelper } = require("uu_appg01_workspace-test");
const { LIST_CREATE, ITEM_GET, ITEM_CREATE} = require("../general-test-hepler");

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
  let response = await TestHelper.executeGetCommand(ITEM_GET, {id:item.id});
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.item.id).toEqual(item.id);
  expect(dtoOut.item.text).toEqual(item.text);
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
  let response = await TestHelper.executeGetCommand(ITEM_GET, {id:item.id, unsupported:"text unsuported"});
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/item/getItem/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupported"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executeGetCommand(ITEM_GET, {});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/getItem/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A3 - item doesnt exists", async () => {
  await TestHelper.login("Authority");

  try {
    await TestHelper.executeGetCommand(ITEM_GET, { id: "5cc98c71f400e0581c16ad62" });
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/item/getItem/itemDoesNotExist");
    expect(e.message).toEqual("Item doesn't exists.");
  }
});
