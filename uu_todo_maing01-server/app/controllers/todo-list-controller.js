"use strict";
const TodoListModel = require("../models/todo-list-model.js");

class TodoListController {


  create(ucEnv){
    return TodoListModel.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.session, ucEnv.getAuthorizationResult());
  }
  get(ucEnv){
    return TodoListModel.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv){
    return TodoListModel.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.session, ucEnv.getAuthorizationResult());
  }
  delete(ucEnv){
    return TodoListModel.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.session, ucEnv.getAuthorizationResult());
  }
  list(ucEnv){
    return TodoListModel.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoListController();
