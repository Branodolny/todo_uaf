const { TestHelper } = require("uu_appg01_workspace-test");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { LIST_CREATE, mockDaoFactory} = require("../general-test-hepler");

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
  let response = await TestHelper.executePostCommand(LIST_CREATE, {name:name});
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.name).toEqual(name);
  expect(dtoOut.awid).toEqual(TestHelper.getAwid());
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("A1 - unsupported keys in dtoIn", async () => {
  await TestHelper.login("Authority");
  let response = await TestHelper.executePostCommand(LIST_CREATE, {
    name: "SEFADFA",
    keys: "brm brm"
  });
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/list/createList/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.keys"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  expect.assertions(2);
  await TestHelper.login("Authority");
  try {
    await TestHelper.executePostCommand(LIST_CREATE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/createList/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A3 - creating list fails", async () => {
  mockDaoFactory();
  const ListModel = require("../../app/models/todo-list-model");
  ListModel.dao = {

    create: () => {
      throw new ObjectStoreError("it failed");
    }
  };
  try {
    await ListModel.create("awid", { name: "..." });
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/createList/listDaoCreateFailed");
    expect(e.message).toEqual("Create list DAO create failed.");
  }
});
