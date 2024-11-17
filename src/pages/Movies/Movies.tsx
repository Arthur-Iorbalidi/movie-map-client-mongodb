import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import Sorting from '@src/components/Sorting/Sorting';
import routes from '@src/constants/routes';
import sortOptions from '@src/constants/sortOptions';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  changeMoviesPage,
  changeMoviesSearch,
  changeMoviesSort,
  changeMoviesSortOrder,
  resetMoviesPage,
} from '@src/store/slices/searchSlice';
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from '@src/store/slices/userSlice';
import { IMoviesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteMovie } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Movies.module.scss';

const Movies = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movies, setMovies] = useState<IMoviesResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.movies);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getMovies(params);
      setMovies(data);
      setIsLoading(false);
    })();
  }, [params]);

  const currentSortOptionIndex =
    sortOptions.movies.findIndex(
      (option) =>
        option.value.sortBy === params.sortBy &&
        option.value.sortOrder === params.sortOrder,
    ) || 0;

  const handleToggleFavorites = (id: string) => {
    toggleFavoriteMovie(
      id,
      isInArray(id, favoritesMovies),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: string) => {
    dispatch(addMovieToFavorites(id));
  };

  const succesRemove = (id: string) => {
    dispatch(removeMovieFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeMoviesSearch(search));
    dispatch(resetMoviesPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeMoviesPage(params.page + count));
  };

  const handleChangeSorting = (index: number) => {
    dispatch(changeMoviesSort(sortOptions.movies[index].value.sortBy));
    dispatch(changeMoviesSortOrder(sortOptions.movies[index].value.sortOrder));
  };

  return (
    <section className={styles.movies_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search}
        />

        <Sorting
          sortOptions={sortOptions.movies.map((elem) => elem.title)}
          currentSortOptionIndex={currentSortOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Movies</h2>

        <Grid isLoading={isLoading}>
          {movies &&
            movies.data.map((movie) => (
              <Item
                key={movie._id}
                id={movie._id}
                handleBtnClickCallback={handleToggleFavorites}
                title={movie.title}
                subtitle={movie.genre}
                caption={new Date(movie.creationDate).getFullYear().toString()}
                image={imageAPI.getImage(movie.image!)}
                isActive={isInArray(movie._id, favoritesMovies)}
                navigateTo={`${routes.movies}/${movie._id}`}
              />
            ))}
        </Grid>

        {movies?.pagination && (
          <Pagination
            pagination={movies?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Movies;
