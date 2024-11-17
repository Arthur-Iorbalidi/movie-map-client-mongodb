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
  changeDirectorsPage,
  changeDirectorsSearch,
  changeDirectorsSort,
  changeDirectorsSortOrder,
  resetDirectorsPage,
} from '@src/store/slices/searchSlice';
import {
  addDirectorToFavorites,
  removeDirectorFromFavorites,
} from '@src/store/slices/userSlice';
import { IDirectorsResponse } from '@src/types/serverAPITypes';
import calculateAge from '@src/utils/calculateAge';
import getShortPeriodOfLife from '@src/utils/getPeriodOfLife';
import isInArray from '@src/utils/isInArray';
import { toggleFavoriteDirector } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Directors.module.scss';

const Directors = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoritesDirectors = useAppSelector(
    (state) => state.userReducer.userInfo?.directors,
  );

  const [directors, setDirectors] = useState<IDirectorsResponse | undefined>(
    undefined,
  );

  const params = useAppSelector((state) => state.searchReducer.directors);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getDirectors(params);
      setDirectors(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleFavorites = (id: string) => {
    toggleFavoriteDirector(
      id,
      isInArray(id, favoritesDirectors),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const currentSortOptionIndex =
    sortOptions.actors.findIndex(
      (option) =>
        option.value.sortBy === params.sortBy &&
        option.value.sortOrder === params.sortOrder,
    ) || 0;

  const succesAdd = (id: string) => {
    dispatch(addDirectorToFavorites(id));
  };

  const succesRemove = (id: string) => {
    dispatch(removeDirectorFromFavorites(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeDirectorsSearch(search));
    dispatch(resetDirectorsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeDirectorsPage(params.page + count));
  };

  const handleChangeSorting = (index: number) => {
    dispatch(changeDirectorsSort(sortOptions.directors[index].value.sortBy));
    dispatch(
      changeDirectorsSortOrder(sortOptions.directors[index].value.sortOrder),
    );
  };

  return (
    <section className={styles.directors_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search}
        />

        <Sorting
          sortOptions={sortOptions.directors.map((elem) => elem.title)}
          currentSortOptionIndex={currentSortOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Directors</h2>

        <Grid isLoading={isLoading}>
          {directors &&
            directors.data.map((director) => (
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
              />
            ))}
        </Grid>

        {directors?.pagination && (
          <Pagination
            pagination={directors?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Directors;
