const {TestHelper} = require("uu_appg01_workspace-test");
const {ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {LIST_GET, LIST_CREATE, LIST_UPDATE, mockDaoFactory} = require("../general-test-hepler");

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
  let created = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
  expect(created.status).toEqual(200);
  let update = {
    list: created.id,
    name: "this is new name"
  };
  let updated = await TestHelper.executePostCommand(LIST_UPDATE, update);
  expect(updated.status).toEqual(200);
  let response = await TestHelper.executeGetCommand(LIST_GET, {id: updated.id});
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.name).toEqual(update.name);
  expect(dtoOut.awid).toEqual(TestHelper.getAwid());
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("A1 - unsupported keys in dtoIn", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let created = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
  let response = await TestHelper.executePostCommand(LIST_UPDATE, {
    list: created.id,
    name: "update name",
    keys: "brm brm"
  });
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/list/updateList/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.keys"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executePostCommand(LIST_UPDATE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/updateList/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A3 - list ist not updated", async () => {
  mockDaoFactory();
  const ListModel = require("../../app/models/todo-list-model");
  ListModel.dao = {
    get : () => {
      return {
        id:"5cc98c71f400e0581c16ad62",
        name: "name"
      };
    },
    update : () => {
      throw new ObjectStoreError("it failed");
    }
  };


  try {
    await ListModel.update("awid", {list: "5cc98c71f400e0581c16ad62", name: "name"});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/updateList/listDaoUpdateFailed");
    expect(e.message).toEqual("List update failed.");
  }
});
