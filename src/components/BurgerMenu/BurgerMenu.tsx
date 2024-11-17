import routes from '@src/constants/routes';
import useAppDispatch from '@src/hooks/useAppDispatch';
import useAppSelector from '@src/hooks/useAppSelector';
import useClickOutside from '@src/hooks/useClickOutside';
import serverAPI from '@src/services/serverAPI';
import {
  changeIsAuthorized,
  changeUserInfo,
} from '@src/store/slices/userSlice';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './BurgerMenu.module.scss';

interface IProps {
  toggleBurgerMenu: () => void;
  isBurgerMenuOpened: boolean;
}

const BurgerMenu = ({ toggleBurgerMenu, isBurgerMenuOpened }: IProps) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    toggleBurgerMenu();
  }, [toggleBurgerMenu]);

  useClickOutside(menuRef, handleClickOutside);

  const logout = () => {
    toggleBurgerMenu();
    serverAPI.logout();
    dispatch(changeIsAuthorized(false));
    dispatch(changeUserInfo(undefined));
  };

  return (
    <>
      {isBurgerMenuOpened && (
        <nav className={styles.burger_menu} ref={menuRef}>
          <ul className={styles.burger_menu_list}>
            <li>
              <Link
                to={routes.movies}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.actors}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Actors</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.directors}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Directors</span>
              </Link>
            </li>
            <div className={styles.line}></div>
            {isAuth ? (
              <>
                <li>
                  <Link
                    to={routes.account}
                    className={styles.link}
                    onClick={toggleBurgerMenu}
                  >
                    <span className={styles.link_text}>Account</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.favorites}
                    className={styles.link}
                    onClick={toggleBurgerMenu}
                  >
                    <span className={styles.link_text}>Favorites</span>
                  </Link>
                </li>
                <li>
                  <button className={styles.link} onClick={logout}>
                    <span className={styles.link_text}>Log out</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={routes.login}
                    className={styles.link}
                    onClick={toggleBurgerMenu}
                  >
                    <span className={styles.link_text}>Log In</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default BurgerMenu;
