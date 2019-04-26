const itemCreateDtoInType = shape({
  list: id().isRequired(),
  text: string(1000).isRequired()
});

const getItemDtoInType = shape({
  id: id().isRequired()
});
