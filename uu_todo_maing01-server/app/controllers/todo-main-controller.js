"use strict";
const TodoMainModel = require("../models/todo-main-model.js");

class TodoMainController {

  init(ucEnv) {
    return TodoMainModel.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  index(ucEnv) {
    let data = {
      text: "ahoj",
      uuAppErrorMap: {}
    };
    return data;
  }

  create(ucEnv) {
    console.log(ucEnv);
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let dtoOut = {
      awid,
      todo: dtoIn.todo,
      uuAppErrorMap: {}
    };

    return dtoOut;
  }
}

module.exports = new TodoMainController();
