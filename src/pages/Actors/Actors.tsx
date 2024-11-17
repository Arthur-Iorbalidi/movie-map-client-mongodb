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
  changeActorsPage,
  changeActorsSearch,
  changeActorsSort,
  changeActorsSortOrder,
  resetActorsPage,
} from '@src/store/slices/searchSlice';
import {
  addActorToFavorites,
  removeActorFromFavorites,
} from '@src/store/slices/userSlice';
import { IActorsResponse } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import getShortPeriodOfLife from '@src/utils/getPeriodOfLife';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteActor } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Actors.module.scss';

const Actors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesActors = useAppSelector(
    (state) => state.userReducer.userInfo?.actors,
  );

  const [actors, setActors] = useState<IActorsResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.actors);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getActors(params);
      setActors(data);
      setIsLoading(false);
    })();
  }, [params]);

  const currentSortOptionIndex =
    sortOptions.actors.findIndex(
      (option) =>
        option.value.sortBy === params.sortBy &&
        option.value.sortOrder === params.sortOrder,
    ) || 0;

  const handleToggleFavorites = (id: string) => {
    toggleFavoriteActor(
      id,
      isInArray(id, favoritesActors),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: string) => {
    dispatch(addActorToFavorites(id));
  };

  const succesRemove = (id: string) => {
    dispatch(removeActorFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeActorsSearch(search));
    dispatch(resetActorsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeActorsPage(params.page + count));
  };

  const handleChangeSorting = (index: number) => {
    dispatch(changeActorsSort(sortOptions.actors[index].value.sortBy));
    dispatch(changeActorsSortOrder(sortOptions.actors[index].value.sortOrder));
  };

  return (
    <section className={styles.actors_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search}
        />

        <Sorting
          sortOptions={sortOptions.actors.map((elem) => elem.title)}
          currentSortOptionIndex={currentSortOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Actors</h2>

        <Grid isLoading={isLoading}>
          {actors &&
            actors.data.map((actor) => (
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
              />
            ))}
        </Grid>

        {actors?.pagination && (
          <Pagination
            pagination={actors?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Actors;
