import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeDirectorFromFavorites } from '@src/store/slices/userSlice';
import { IDirector } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import getShortPeriodOfLife from '@src/utils/getPeriodOfLife';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteDirector } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DirectorsReports from '../DirectorsReports/DirectorsReports';
import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const FavoriteDirectors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesDirectors = useAppSelector(
    (state) => state.userReducer.userInfo?.directors,
  );

  const [directors, setDirectors] = useState<IDirector[] | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFavoriteDirectors();
      setDirectors(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorites = (id: string) => {
    toggleFavoriteDirector(
      id,
      isInArray(id, favoritesDirectors),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: string) => {
    dispatch(removeDirectorFromFavorites(id));
    setDirectors((prev) => prev?.filter((elem) => elem._id !== id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {directors?.length !== 0 && <DirectorsReports />}
      <Grid
        isLoading={isLoading}
        message={directors?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {directors &&
          directors.map((director) => (
            <Item
              key={director._id}
              id={director._id}
              handleBtnClickCallback={handleToggleFavorites}
              title={`${director.name} ${director.surname}`}
              subtitle={
                director.dateOfDeath
                  ? `${getShortPeriodOfLife(director.birthday, director.dateOfDeath)} (${calculateAge(director.birthday, director.dateOfDeath)} years)`
                  : `${calculateAge(director.birthday, director.dateOfDeath)} years`
              }
              image={imageAPI.getImage(director.image!)}
              isActive={isInArray(director._id, favoritesDirectors)}
              navigateTo={`${routes.directors}/${director._id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default FavoriteDirectors;
