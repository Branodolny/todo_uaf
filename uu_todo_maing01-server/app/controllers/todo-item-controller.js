"use strict";
const TodoItemModel = require("../models/todo-item-model.js");

class TodoItemController {


  create(ucEnv){
    return TodoItemModel.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  get(ucEnv){
    return TodoItemModel.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv){
    return TodoItemModel.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  complete(ucEnv){
    return TodoItemModel.complete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv){
    return TodoItemModel.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv){
    return TodoItemModel.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoItemController();
