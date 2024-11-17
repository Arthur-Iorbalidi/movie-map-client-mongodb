import serverAPI from '@src/services/serverAPI';

const toggleFavoriteMovie = (
  id: string,
  isInFavorites: boolean,
  succesAdd: (id: string) => void = () => {},
  succesRemove: (id: string) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInFavorites) {
    serverAPI.removeMovieFromFavorites(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addMovieToFavorites(id, succesAdd, unathorizedCallback);
  }
};

const toggleFavoriteActor = (
  id: string,
  isInFavorites: boolean,
  succesAdd: (id: string) => void = () => {},
  succesRemove: (id: string) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInFavorites) {
    serverAPI.removeActorFromFavorites(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addActorToFavorites(id, succesAdd, unathorizedCallback);
  }
};

const toggleFavoriteDirector = (
  id: string,
  isInFavorites: boolean,
  succesAdd: (id: string) => void = () => {},
  succesRemove: (id: string) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInFavorites) {
    serverAPI.removeDirectorFromFavorites(
      id,
      succesRemove,
      unathorizedCallback,
    );
  } else {
    serverAPI.addDirectorToFavorites(id, succesAdd, unathorizedCallback);
  }
};

export { toggleFavoriteActor, toggleFavoriteDirector, toggleFavoriteMovie };
