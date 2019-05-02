"use strict";

const TodoMainUseCaseError = require("./todo-main-use-case-error");
const LIST_ERROR_PREFIX = `${TodoMainUseCaseError.ERROR_PREFIX}item/`;

const Create = {
  UC_CODE: `${LIST_ERROR_PREFIX}createItem/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  listDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listDoesNotExist`;
      this.message = "List doesn't exists.";
    }
  },

  itemDaoCreateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}itemDaoCreateFailed`;
      this.message = "Create item DAO create failed.";
    }
  }
};

const Get = {
  UC_CODE: `${LIST_ERROR_PREFIX}getItem/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  itemDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}itemDoesNotExist`;
      this.message = "Item doesn't exists.";
    }
  }
};

const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}updateItem/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  itemDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}itemDaoCreateFailed`;
      this.message = "Item doesn't exists.";
    }
  },
  itemDaoUpdateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}itemDaoUpdateFailed`;
      this.message = "Item update failed.";
    }
  }
};
const Complete = {
  UC_CODE: `${LIST_ERROR_PREFIX}completeItem/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Complete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  itemDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Complete.UC_CODE}itemDaoCompleteFailed`;
      this.message = "Item doesn't exists.";
    }
  },
  itemDaoUpdateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Complete.UC_CODE}itemDaoCompleteFailed`;
      this.message = "Item complete failed.";
    }
  }
};
const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}deleteItem/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  itemDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}itemDaoDeleteFailed`;
      this.message = "Item doesn't exists.";
    }
  },
  itemDaoDeleteFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}itemDaoDeleteFailed`;
      this.message = "Item delete failed.";
    }
  },

};
const List = {
  UC_CODE: `${LIST_ERROR_PREFIX}listItem/`,
  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  itemDaoListFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}itemDaoListFailed`;
      this.message = "Item list failed.";
    }
  },

};
module.exports = {
  Create,
  Get,
  Update,
  Delete,
  List,
  Complete
};
