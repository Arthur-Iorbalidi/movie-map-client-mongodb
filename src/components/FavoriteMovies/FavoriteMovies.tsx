import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeMovieFromFavorites } from '@src/store/slices/userSlice';
import { IMovie } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteMovie } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';
import MoviesReports from '../MoviesReports/MoviesReports';

const FavoriteMovies = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movies, setMovies] = useState<IMovie[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFavoriteMovies();
      setMovies(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorites = (id: string) => {
    toggleFavoriteMovie(
      id,
      isInArray(id, favoritesMovies),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: string) => {
    dispatch(removeMovieFromFavorites(id));
    setMovies((prevMovies) => prevMovies?.filter((movie) => movie._id !== id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {movies?.length !== 0 && <MoviesReports />}
      <Grid
        isLoading={isLoading}
        message={movies?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {movies &&
          movies.map((movie) => (
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
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default FavoriteMovies;
