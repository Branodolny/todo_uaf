const { TestHelper } = require("uu_appg01_workspace-test");
const { LIST_GET,LIST_CREATE} = require("../general-test-hepler");

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
  let created = await TestHelper.executePostCommand(LIST_CREATE, {name:name});
  let response = await TestHelper.executeGetCommand(LIST_GET, {id:created.id});
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.name).toEqual(name);
  expect(dtoOut.awid).toEqual(TestHelper.getAwid());
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("A1 - unsupported keys in dtoIn", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let created =await TestHelper.executePostCommand(LIST_CREATE, {name:name});
  let response = await TestHelper.executeGetCommand(LIST_GET, {
    id: created.id,
    keys: "brm brm"
  });
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/list/getList/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.keys"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executeGetCommand(LIST_GET, {});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/getList/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A3 - list doesnt exists", async () => {
   await TestHelper.login("Authority");

  try {
    await TestHelper.executeGetCommand(LIST_GET, { id: "5cc98c71f400e0581c16ad62" });
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/getList/listDaoCreateFailed");
    expect(e.message).toEqual("List doesn't exists.");
  }
});
