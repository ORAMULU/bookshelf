/* import {
  useState
} from 'react'; */
import Header from '../components/Header';
import Push from '../components/Push'
import styles from './Settings.module.css';



export default function Settings () {
  return(
    <div className={styles.setPage}>
      <Header title="Settings" />
      <div className={styles.pageContent}>
        <div className={styles.pageContentItem}>
          <Push />
        </div>
      </div>
    </div>
  );
}