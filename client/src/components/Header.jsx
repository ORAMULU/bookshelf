import {
  useNavigate
} from 'react-router';
import styles from './Header.module.css';

export default function Header ( {
  title
}) {
  const navigate = useNavigate()

  return(<div className={styles.header}>
    <div onClick={() => { navigate(-1)}} className={styles.iconBtn}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12H5" />/
        <path d="m12 19-7-7 7-7" />
      </svg>
    </div>
    <div className={styles.headerLabel} title={title}>
      {title}
    </div>
    <div className={styles.rightSlot}></div>
    {
    /*<div className={styles.perforation}></div>
      */
    } < /div>
    );
    }

   