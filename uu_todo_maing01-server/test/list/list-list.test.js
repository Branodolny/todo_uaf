const { TestHelper } = require("uu_appg01_workspace-test");
const { LIST_LIST,LIST_CREATE} = require("../general-test-hepler");

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
  let response = await TestHelper.executeGetCommand(LIST_LIST, {});
  expect(response.status).toEqual(200);
  let dtoOut = response;
  expect(dtoOut.itemList[0].name).toEqual(name);
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

test("A1 - unsupported keys in dtoIn", async () => {
  await TestHelper.login("Authority");
  let name = "new list name";
  let created =await TestHelper.executePostCommand(LIST_CREATE, {name:name});
  let response = await TestHelper.executeGetCommand(LIST_LIST, {
    keys: "brm brm"
  });
  expect(response.status).toEqual(200);
  let warning = response.uuAppErrorMap["uu-todo-main/list/listList/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.");
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.keys"]);
});

test("A2 - dtoIn is not valid", async () => {
  await TestHelper.login("Authority");
  try {
    await TestHelper.executeGetCommand(LIST_LIST, {pageInfo:{pageIndex:true}});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/listList/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

