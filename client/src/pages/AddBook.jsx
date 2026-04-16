import {
  useState, useEffect
} from 'react';
import {
  useNavigate
} from 'react-router';
import PageTransition from '../components/PageTransition';
import {
  useToast
} from '../ToastContext';
import styles from './AddBook.module.css';

const GENRES = ['Programming', 'Self Help', 'Spiritual', 'Fiction', 'Non-Fiction', 'Science', 'Philosophy'];
const STATUSES = ['Reading', 'Completed', 'Want to Read'];

function AddBook( {
  onAdd
}) {
  const navigate = useNavigate();
  const {
    showToast
  } = useToast();
  const [form,
    setForm] = useState( {
      title: '',
      author: '',
      genre: GENRES[0],
      status: 'Want to Read',
      rating: 0,
      year: new Date().getFullYear().toString(),
    });


  
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setForm(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      showToast('Please fill in title and author', 'error');
      return;
    }
    onAdd( {
      ...form, id: Date.now(), rating: Number(form.rating)
    });
    showToast('Book added successfully! 📚', 'success');
    navigate('/books');
  };

  return (
    <PageTransition>
      <div className={styles.addPage}>
        <div className={styles.header}>
          <h1>New Entry</h1>
          <p>
            Add a new masterpiece to your shelf
          </p>
        </div>

        <form className={styles.addForm} onSubmit={handleSubmit}>
          {/* Main Info Group */}
          <div className={styles.section}>
            <div className={styles.inputGroup}>
              <input
              name="title"
              placeholder="Book Title"
              value={form.title}
              onChange={handleChange}
              className={styles.mainInput}
              />
          </div>
          <div className={styles.inputGroup}>
            <input
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
            className={styles.mainInput}
            />
        </div>
      </div>

      {/* Genre Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Genre</label>
        <div className={styles.pillGrid}>
          {GENRES.map(g => (
            <button
              key={g}
              type="button"
              className={`${styles.pill} ${form.genre === g ? styles.activePill: ''}`}
              onClick={() => setForm(prev => ({ ...prev, genre: g }))}
              >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Status Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Reading Status</label>
        <div className={styles.statusGroup}>
          {STATUSES.map(s => (
            <button
              key={s}
              type="button"
              className={`${styles.statusBtn} ${form.status === s ? styles.activeStatus: ''}`}
              onClick={() => setForm(prev => ({ ...prev, status: s }))}
              >
              {s === 'Reading' ? '📖 ': s === 'Completed' ? '✅ ': '🔖 '}
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div className={styles.section}>
        <label className={styles.label}>Initial Rating</label>
        <div className={styles.starRating}>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`${styles.star} ${form.rating >= star ? styles.starActive: ''}`}
              onClick={() => setForm(prev => ({ ...prev, rating: star }))}
              >
              ★
            </span>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Confirm Entry 🖋️
      </button>
    </form>
  </div>
</PageTransition>
);
}

export default AddBook;