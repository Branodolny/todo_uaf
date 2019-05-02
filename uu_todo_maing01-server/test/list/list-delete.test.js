const {TestHelper} = require("uu_appg01_workspace-test");
const {ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {LIST_CREATE, ITEM_CREATE, LIST_DELETE, mockDaoFactory} = require("../general-test-hepler");

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

// test("HDS forceDelete =  true", async () => {
//   await TestHelper.login("Authority");
//   let name = "new list name";
//   let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
//   expect(list.status).toEqual(200);
//   let itemData = {
//     list: list.id,
//     text: "new list text"
//   };
//   let item = await TestHelper.executePostCommand(ITEM_CREATE, itemData);
//   expect(item.status).toEqual(200);
//   let deleteList = await TestHelper.executePostCommand(LIST_DELETE, {id: list.id, forceDelete: true});
//   expect(deleteList.status).toEqual(200);
//   expect(deleteList.uuAppErrorMap).toEqual({});
// });
//
// test("HDS forceDelete =  false, without items", async () => {
//   await TestHelper.login("Authority");
//   let name = "new list name";
//   let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
//   expect(list.status).toEqual(200);
//   let deleteList = await TestHelper.executePostCommand(LIST_DELETE, {id:list.id});
//   expect(deleteList.status).toEqual(200);
//   expect(deleteList.uuAppErrorMap).toEqual({});
// });
//
// test("HDS forceDelete = false, with items ->  same A3", async () => {
//   await TestHelper.login("Authority");
//   let name = "new list name";
//   let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
//   expect(list.status).toEqual(200);
//   let itemData = {
//     list: list.id,
//     text: "new list text"
//   };
//   let item = await TestHelper.executePostCommand(ITEM_CREATE, itemData);
//   expect(item.status).toEqual(200);
//   try {
//      await TestHelper.executePostCommand(LIST_DELETE, {id:list.id});
//   } catch (e) {
//     expect(e.code).toEqual("uu-todo-main/list/deleteList/listNotEmpty");
//     expect(e.message).toEqual("List is not empty.");
//   }
// ;
// });
//
// test("A1 - unsupported keys in dtoIn", async () => {
//   await TestHelper.login("Authority");
//   let name = "new list name";
//   let list = await TestHelper.executePostCommand(LIST_CREATE, {name: name});
//   expect(list.status).toEqual(200);
//   let response = await TestHelper.executePostCommand(LIST_DELETE, {id:list.id, keys:"here we are"});
//   let warning = response.uuAppErrorMap["uu-todo-main/list/deleteList/unsupportedKeys"];
//   expect(warning).toBeTruthy();
//   expect(warning.type).toEqual("warning");
//   expect(warning.message).toEqual("DtoIn contains unsupported keys.");
//   expect(warning.paramMap.unsupportedKeyList).toEqual(["$.keys"]);
// });
//
// test("A2 - dtoIn is not valid", async () => {
//   await TestHelper.login("Authority");
//   expect.assertions(2);
//   await TestHelper.login("Authority");
//   try {
//     await TestHelper.executePostCommand(LIST_DELETE, {});
//   } catch (e) {
//     expect(e.code).toEqual("uu-todo-main/list/deleteList/invalidDtoIn");
//     expect(e.message).toEqual("DtoIn is not valid.");
//   }
// });

test("A4 - items delete failed", async () => {
  mockDaoFactory();
  const ListModel = require("../../app/models/todo-list-model");
  ListModel.itemDao = {
    countItemByList: ()=> {
      return 1;
    },
    listByListAndCompleted: ()=>{
      return {
        id:"5cc98c71f400e0581c16ad62",
        text: "name",
        list:"5cc98c71f400e0581c16ad62"
      }
    },
    deleteMany: () => {
      throw new ObjectStoreError("it failed");
    }
  };
  ListModel.dao = {
    get : () => {
      return {
        id:"5cc98c71f400e0581c16ad62",
        text: "name",
      };
    }

  };
  try {
    await ListModel.delete("awid", {id: "5ccb19964234c258ec645892" , forceDelete:true});
  } catch (e) {
    expect(e.code).toEqual("uu-todo-main/list/deleteList/itemsDaoDeleteFailed");
    expect(e.message).toEqual("Items delete failed.");
  }
});

test("A5 - delete list fails", async () => {
  mockDaoFactory();
  const ListModel = require("../../app/models/todo-list-model");
  ListModel.itemDao = {

    countItemByList: ()=> {
      return 0;
    }

  };
  ListModel.dao = {
    get : () => {
      return {
        id:"5cc98c71f400e0581c16ad62",
        text: "name",
      };
    },
    countItemByList: ()=> {
      return 0;
    },
    delete: () => {
      throw new ObjectStoreError("it failed");
    }
  };
  try {
    await ListModel.delete("awid", { id: "5ccb19964234c258ec645892" });
  } catch (e) {
    console.log(e);
    expect(e.code).toEqual("uu-todo-main/list/deleteList/listDaoDeleteFailed");
    expect(e.message).toEqual("List delete failed.");
  }
});
