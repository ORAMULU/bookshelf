import PageTransition from '../components/PageTransition';
import Header from '../components/Header';
import styles from './Notifications.module.css';


function Notifications () {
  // Mock data for now - you can move this to App.jsx state later
  const alerts = [{
    id: 1,
    type: 'achievement',
    title: 'Reading Streak!',
    message: 'You’ve logged books 3 days in a row. Keep the momentum going!',
    time: '2h ago',
    icon: '🔥'
  },
    {
      id: 2,
      type: 'reminder',
      title: 'Don’t forget "Atomic Habits"',
      message: 'You haven’t updated your progress in 2 days. Ready to read a chapter?',
      time: '1d ago',
      icon: '🔖'
    },
    {
      id: 3,
      type: 'system',
      title: 'Library Updated',
      message: 'Version 1.0.1 is live. New "Pill" selection added to search.',
      time: '2d ago',
      icon: '⚙️'
    }];

  return (
    <PageTransition>
      <div className={styles.notifPage}>
        <Header title="Notifications" />
        <header className={styles.header}>
          <h1 className={styles.title}>Activity Log</h1>
          <button className={styles.clearAll}>Mark all read</button>
        </header>

        <div className={styles.list}>
          {alerts.map((alert) => (
            <div key={alert.id} className={`${styles.card} ${styles[alert.type]}`}>
              <div className={styles.iconBox}>
                {alert.icon}
              </div>
              <div className={styles.content}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{alert.title}</span>
                  <span className={styles.cardTime}>{alert.time}</span>
                </div>
                <p className={styles.message}>
                  {alert.message}
                </p>
              </div>
              {/* This mimics the "perforated edge" of a library slip */}
              <div className={styles.perforation}></div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export default Notifications;