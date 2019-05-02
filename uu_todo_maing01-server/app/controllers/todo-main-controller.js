"use strict";
const TodoMainModel = require("../models/todo-main-model.js");

class TodoMainController {

  init(ucEnv) {
    return TodoMainModel.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoMainController();
