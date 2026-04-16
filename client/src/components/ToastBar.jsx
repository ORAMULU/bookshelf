import styles from './ToastBar.module.css';


function ToastBar ( {
  msg, show, type
}) {

  const icon = type === 'success' ? '✅': type === 'error' ? '❌': '⚠️';


  return (
    <div className={`${styles.toastBar} ${show ? '': styles.show}`}>
      <div className={styles.toastWrapper}>
        <div className={styles.toastIcon}>
          {icon}
        </div>
        <div className={styles.toastContent}>
          <h3></h3>
          <p>
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToastBar;