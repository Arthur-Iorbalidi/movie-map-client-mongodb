import routes from '@src/constants/routes';
import {
  downloadFavoriteDirectorsReportDocx,
  downloadFavoriteDirectorsReportPDF,
} from '@src/utils/Reports';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button/Button';
import styles from './DirectorsReports.module.scss';

const DirectorsReports = () => {
  const navigate = useNavigate();

  const getReportPDF = () => {
    downloadFavoriteDirectorsReportPDF(unathorizedCallback);
  };

  const getReportDocx = () => {
    downloadFavoriteDirectorsReportDocx(unathorizedCallback);
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

export default DirectorsReports;
