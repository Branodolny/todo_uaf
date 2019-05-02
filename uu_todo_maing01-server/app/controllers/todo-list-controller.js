"use strict";
const TodoListModel = require("../models/todo-list-model.js");

class TodoListController {


  create(ucEnv){
    console.log(ucEnv.getDtoIn());
    return TodoListModel.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  get(ucEnv){
    return TodoListModel.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv){
    return TodoListModel.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv){
    return TodoListModel.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv){
    return TodoListModel.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoListController();
