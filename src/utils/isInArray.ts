const isInArray = (id: string, array: { _id: string }[] | undefined) => {
  if (array) {
    return array.some((elem) => elem._id === id);
  }
  return false;
};

export default isInArray;
