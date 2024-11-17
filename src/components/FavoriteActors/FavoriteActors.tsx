import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeActorFromFavorites } from '@src/store/slices/userSlice';
import { IActor } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import getShortPeriodOfLife from '@src/utils/getPeriodOfLife';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteActor } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ActorsReports from '../ActorsReports/ActorsReports';
import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const FavoriteActors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesActors = useAppSelector(
    (state) => state.userReducer.userInfo?.actors,
  );

  const [actors, setActors] = useState<IActor[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFavoriteActors();
      setActors(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorites = (id: string) => {
    toggleFavoriteActor(
      id,
      isInArray(id, favoritesActors),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: string) => {
    dispatch(removeActorFromFavorites(id));
    setActors((prev) => prev?.filter((elem) => elem._id !== id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {actors?.length !== 0 && <ActorsReports />}
      <Grid
        isLoading={isLoading}
        message={actors?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {actors &&
          actors.map((actor) => (
            <Item
              key={actor._id}
              id={actor._id}
              handleBtnClickCallback={handleToggleFavorites}
              title={`${actor.name} ${actor.surname}`}
              subtitle={
                actor.dateOfDeath
                  ? `${getShortPeriodOfLife(actor.birthday, actor.dateOfDeath)} (${calculateAge(actor.birthday, actor.dateOfDeath)} years)`
                  : `${calculateAge(actor.birthday, actor.dateOfDeath)} years`
              }
              image={imageAPI.getImage(actor.image!)}
              isActive={isInArray(actor._id, favoritesActors)}
              navigateTo={`${routes.actors}/${actor._id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default FavoriteActors;
