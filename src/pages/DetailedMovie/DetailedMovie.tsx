import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from '@src/store/slices/userSlice';
import { IMovie } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteMovie } from '@src/utils/toggleFavorites';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedMovie.module.scss';

const DetailedMovie = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const favoritesMovies = useAppSelector(
    (state) => state.userReducer.userInfo?.movies,
  );

  const [movie, setMovie] = useState<IMovie | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getMovie(id!, errorCallback);
      setMovie(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: string) => {
    dispatch(addMovieToFavorites(id));
  };

  const succesRemove = (id: string) => {
    dispatch(removeMovieFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const errorCallback = (message: string) => {
    setError(message);
  };

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    toggleFavoriteMovie(
      movie!._id,
      isInArray(movie!._id, favoritesMovies),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className={styles.detailed_page}>
      {isLoading && <Loader />}
      {movie && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.artwork_img}
                src={imageAPI.getImage(movie.image!)}
                alt="movie"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(movie._id, favoritesMovies)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{movie.title}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Creation Date:
                  </span>
                  <span className={styles.overview_item_value}>
                    {movie.creationDate}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>genre:</span>
                  <span className={styles.overview_item_value}>
                    {movie.genre}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Budget:</span>
                  <span className={styles.overview_item_value}>
                    {`$${movie.budget}`}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Director:</span>
                  <span className={styles.overview_item_value}>
                    {movie.directors?.map((director, index) => (
                      <Fragment key={director._id}>
                        <Link
                          className={styles.overview_item_value_link}
                          key={director._id}
                          to={`${routes.directors}/${director._id}`}
                        >{`${director.name} ${director.surname}`}</Link>
                        {index < movie.directors!.length - 1 && ', '}
                      </Fragment>
                    ))}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Actors:</span>
                  <span className={styles.overview_item_value}>
                    {movie.actors?.map((actor, index) => (
                      <Fragment key={actor._id}>
                        <Link
                          className={styles.overview_item_value_link}
                          to={`${routes.actors}/${actor._id}`}
                        >
                          {`${actor.name} ${actor.surname}`}
                        </Link>
                        {index < movie.actors!.length - 1 && ', '}
                      </Fragment>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.description_wrapper}>
            <h2 className={styles.description_title}>Description</h2>
            <div className={styles.description}>{movie.description}</div>
          </div>
        </div>
      )}
      {error && <Message message={error} />}
    </section>
  );
};

export default DetailedMovie;
