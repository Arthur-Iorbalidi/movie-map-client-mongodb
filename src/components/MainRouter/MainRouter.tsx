import routes from '@src/constants/routes';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import Account from '@src/pages/Account/Account';
import Actors from '@src/pages/Actors/Actors';
import DetailedActor from '@src/pages/DetailedActor/DetailedActor';
import DetailedDirector from '@src/pages/DetailedDirector/DetailedDirector';
import DetailedMovie from '@src/pages/DetailedMovie/DetailedMovie';
import Directors from '@src/pages/Directors/Directors';
import Favorites from '@src/pages/Favorites/Favorites';
import Movies from '@src/pages/Movies/Movies';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/*" element={<Navigate to={routes.movies} replace />} />
          <Route path={routes.movies} element={<Movies />} />
          <Route path={routes.actors} element={<Actors />} />
          <Route path={routes.directors} element={<Directors />} />
          <Route path={routes.detailedMovie} element={<DetailedMovie />} />
          <Route path={routes.detailedActor} element={<DetailedActor />} />
          <Route
            path={routes.detailedDirector}
            element={<DetailedDirector />}
          />
          <Route path={routes.account} element={<Account />} />
          <Route path={routes.favorites} element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
