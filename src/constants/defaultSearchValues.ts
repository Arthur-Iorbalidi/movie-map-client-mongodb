const defaultSearchValues = {
  movies: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 6,
  },
  actors: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 6,
  },
  directors: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 6,
  },
};
const debounceInterval = 500;

export default defaultSearchValues;
export { debounceInterval };
