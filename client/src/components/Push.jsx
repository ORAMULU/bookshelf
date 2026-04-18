import {
  useState,
  useEffect
} from 'react';
import {
  subscribeUser,
  unsubscribeUser,
  getExistingSubscription
} from '../utils/pushSubscription';
import styles from './Push.module.css'

function Push () {
  const [checked,
    setChecked] = useState(false);
  const [loading,
    setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem("pushEnabled");
      if (saved === "true") {
        const sub = await getExistingSubscription();
        if (sub) {
          setChecked(true);
        } else {
          localStorage.setItem("pushEnabled", "false");
          setChecked(false);
        }
      }
    };
    init();
  },
    []);

  const handleToggle = async (e) => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 20, 10]);
    } else {
      // fallback → play click sound
    }
    const isChecked = e.target.checked;
    setLoading(true);
    if (isChecked) {
      const sub = await subscribeUser();
      if (sub) {
        localStorage.setItem("pushEnabled", "true");
        setChecked(true);
        alert("Notifications enabled 🔔");
      } else {
        setChecked(false);
      }
    } else {
      const success = await unsubscribeUser()
      if (success) {
        localStorage.setItem("pushEnabled", "false");
        setChecked(false);
        alert("Notifications disabled ❌");
      } else {
        setChecked('false');
      }
    }

    setLoading(false);
  }

  return(
    <>
      <div style={ { display: 'flex', flexFlow: 'column nowrap', gap: '10px', }}>
        <div>
          Enable Push Notifications
        </div>
      </div>
      <div>
        <label className={`${styles.switch} ${loading ? styles.loading: ""}`}>
          <input
          type="checkbox"
          onChange={handleToggle}
          checked={checked}
          disabled={loading}
          data-checked={checked}
          className={ styles.actionBtn } />
        <span className={styles.slider}></span>
      </label>
    </div>
  </>
);
}

export default Push;