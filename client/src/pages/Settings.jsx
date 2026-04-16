import {
  useState
} from 'react';
import styles from './Settings.module.css';
import {
  subscribeUser
} from '../utils/pushSubscription';

function Push() {
  const [checked,
    setChecked] = useState(true);

  const handleEnableNotifications = async () => {
    const success = await subscribeUser();
    if (success) {
      alert("You're all set! 📚");
    }
  };


  return (
    <>
      <div style={ { display: 'flex', flexFlow: 'column nowrap', gap: '10px', }}>
        <h2>Stay Updated</h2>
        <p>
          Enable Push Notifications
        </p>
      </div>
      <div>
        <label className={styles.switch}>
          <input
          type="checkbox"
          onClick={handleEnableNotifications}
          checked={checked}
          className={ styles.actionBtn } />
        <span className={styles.slider}></span>
      </label>
    </div>
  </>
);
}

export default function Settings () {
return(
<div className={styles.setPage}>
<div className={styles.header}>
<div>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
<path d="M22 12H5" />/
<path d="m12 19-7-7 7-7" />
</svg>
</div>
<div className={styles.headerLabel}>
Settings
</div>
<div></div>
{/*<div className={styles.perforation}></div>
      */}
</div>
<div className={styles.pageContent}>
<div className={styles.pageContentItem}>
<Push />
</div>
</div>
</div>
);
}