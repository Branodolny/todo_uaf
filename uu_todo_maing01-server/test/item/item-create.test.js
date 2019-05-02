const { TestHelper } = require("uu_appg01_workspace-test");
const { ITEM_CREATE, LIST_CREATE} = require("../general-test-hepler");

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
  let response = await TestHelper.executePostCommand(ITEM_CREATE, data);
  let dtoOut = response;
  expect(dtoOut.text).toEqual(data.text);
  expect(dtoOut.awid).toEqual(TestHelper.getAwid());
  expect(dtoOut.uuAppErrorMap).toEqual({});
});

