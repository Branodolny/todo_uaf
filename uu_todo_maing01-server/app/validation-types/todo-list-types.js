const createListDtoInType = shape({
  name: string(50).isRequired()
});

const getListDtoInType = shape({
  id: id().isRequired()
});

const updateListDtoInType = shape({
  list: id().isRequired(),
  name: string(50)
});

const deleteListDtoInType = shape({
  id: id().isRequired()
});
