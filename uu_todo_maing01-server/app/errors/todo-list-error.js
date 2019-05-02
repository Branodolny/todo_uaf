"use strict";

const TodoMainUseCaseError = require("./todo-main-use-case-error");
const LIST_ERROR_PREFIX = `${TodoMainUseCaseError.ERROR_PREFIX}list/`;

const Create = {
  UC_CODE: `${LIST_ERROR_PREFIX}createList/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  listDaoCreateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listDaoCreateFailed`;
      this.message = "Create list DAO create failed.";
    }
  },

};

const Get = {
  UC_CODE: `${LIST_ERROR_PREFIX}getList/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  listDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}listDaoCreateFailed`;
      this.message = "List doesn't exists.";
    }
  }
};

const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}updateList/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  listDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}listDaoCreateFailed`;
      this.message = "List doesn't exists.";
    }
  },
  listDaoUpdateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}listDaoUpdateFailed`;
      this.message = "List update failed.";
    }
  }
};
const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}deleteList/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  listDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}listDaoCreateFailed`;
      this.message = "List doesn't exists.";
    }
  },
  listDaoDeleteFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}listDaoDeleteFailed`;
      this.message = "List delete failed.";
    }
  },
  itemsDaoDeleteFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}itemsDaoDeleteFailed`;
      this.message = "Items delete failed.";
    }
  },
  listNotEmpty: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}listNotEmpty`;
      this.message = "List is not empty.";
    }
  }

};

const List = {
  UC_CODE: `${LIST_ERROR_PREFIX}listList/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

module.exports = {
  Create,
  Get,
  Update,
  Delete,
  List
};
