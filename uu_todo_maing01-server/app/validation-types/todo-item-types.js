const itemCreateDtoInType = shape({
  list: id().isRequired(),
  text: string(1000).isRequired()
});

const getItemDtoInType = shape({
  id: id().isRequired()
});

const updateItemDtoInType = shape({
  item: id().isRequired(),
  list: id(),
  text: string(1000)
});

const completeItemDtoInType = shape({
  item: id().isRequired(),
  list: id(),
  text: string(1000),
  complete: boolean()
});

const deleteItemDtoInType = shape({
  id: id().isRequired()
});


const listItemsDtoInType = shape({
  list: id(),
  completed: boolean(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})
