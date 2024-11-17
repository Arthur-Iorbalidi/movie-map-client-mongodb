import routes from '@src/constants/routes';
import {
  downloadFavoriteActorsReportDocx,
  downloadFavoriteActorsReportPDF,
} from '@src/utils/Reports';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button/Button';
import styles from './ActorsReports.module.scss';

const ActorsReports = () => {
  const navigate = useNavigate();

  const getReportPDF = () => {
    downloadFavoriteActorsReportPDF(unathorizedCallback);
  };

  const getReportDocx = () => {
    downloadFavoriteActorsReportDocx(unathorizedCallback);
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

export default ActorsReports;
