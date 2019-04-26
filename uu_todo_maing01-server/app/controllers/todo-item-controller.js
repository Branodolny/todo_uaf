"use strict";
const TodoItemModel = require("../models/todo-item-model.js");

class TodoItemController {


  create(ucEnv){
    return TodoItemModel.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.session, ucEnv.getAuthorizationResult());
  }
  get(ucEnv){
    return TodoItemModel.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv){
    return TodoItemModel.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.session, ucEnv.getAuthorizationResult());
  }
  delete(ucEnv){
    return TodoItemModel.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.session, ucEnv.getAuthorizationResult());
  }
  list(ucEnv){
    return TodoItemModel.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoItemController();
