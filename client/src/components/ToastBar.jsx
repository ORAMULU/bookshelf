import styles from './ToastBar.module.css';


function ToastBar ( {
  msg, show, type
}) {

  const icon = type === 'success' ? '✅': type === 'error' ? '❌': type === 'warn' ? '⚠️': null;


  return (
    <div className={`${styles.toastBar} ${show ? '': styles.show}`}>
      <div className={styles.toastWrapper}>
        <div className={styles.toastIcon}>
          {icon}
        </div>
        <div className={styles.toastContent}>
            {msg}
        </div>
      </div>
    </div>
  );
}

export default ToastBar;