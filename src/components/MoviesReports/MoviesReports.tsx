import routes from '@src/constants/routes';
import {
  downloadFavoriteMoviesReportDocx,
  downloadFavoriteMoviesReportPDF,
} from '@src/utils/Reports';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button/Button';
import styles from './MoviesReports.module.scss';

const MoviesReports = () => {
  const navigate = useNavigate();

  const getReportPDF = () => {
    downloadFavoriteMoviesReportPDF(unathorizedCallback);
  };

  const getReportDocx = () => {
    downloadFavoriteMoviesReportDocx(unathorizedCallback);
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <div className={styles.download}>
      <Button value="Report PDF" onClick={getReportPDF} />
      <Button value="Report Docx" onClick={getReportDocx} />
    </div>
  );
};

export default MoviesReports;
