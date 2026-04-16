import {
  useState, useEffect
} from 'react';
import {
  useParams,
  Link,
  useNavigate
} from 'react-router';
import PageTransition from '../components/PageTransition.jsx';
import styles from './BookDetail.module.css';

const GENRES = ['Programming', 'Narrative', 'Poetry', 'Prophecy', 'Gospel', 'Epistle', 'History', 'Apocalyptic', 'Self Help', 'Spiritual', 'Fiction', 'Non-Fiction', 'Science', 'Philosophy'];
const STATUSES = ['Reading', 'Completed', 'Want to Read'];

function BookDetail( {
  books, setBooks, updateBook
}) {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const book = books.find(book => book.id === Number(id));

  const [editing,
    setEditing] = useState(false);
  const [editForm,
    setEditForm] = useState(null);

  function startEdit() {
    setEditForm({
      ...book
    });
    setEditing(true);
  }

  function handleEditChange(e) {
    const {
      name,
      value
    } = e.target;
    setEditForm(prev => ({
      ...prev, [name]: value
    }));
  }

  function handleSave() {
    if (!editForm.title || !editForm.author) {
      alert('Title and author are required.');
      return;
    }
    updateBook( {
      ...editForm, rating: Number(editForm.rating)
    });
    setEditing(false);
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    setBooks(prev => prev.filter(b => b.id !== book.id));
    navigate('/books');
  }
  


  if (!book) {
    return (
      <div className={styles.bookDetailPage}>
        <Link to="/books" className={styles.backLink}>← Back</Link>
        <p>
          Book not found!
        </p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className={styles.bookDetailPage}>
        <Link to="/books" className={styles.backLink}>← Back</Link>

        {editing ? (
          <div className={styles.bookPageSections}>
            <div className={styles.sectionOne}>
              <p className={styles.bookAvatar}>
                {editForm.title[0] || '?'}
              </p>
              <p className={styles.detailPageTitle}>
                Edit Book
              </p>
            </div>
            <div className={styles.editFormBody}>
              <div className={styles.editField}>
                <label className={styles.editLabel}>Title</label>
                <input
                className={styles.editInput}
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Book title"
                />
            </div>
            <div className={styles.editField}>
              <label className={styles.editLabel}>Author</label>
              <input
              className={styles.editInput}
              name="author"
              value={editForm.author}
              onChange={handleEditChange}
              placeholder="Author name"
              />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Genre</label>
            <select className={styles.editInput} name="genre" value={editForm.genre} onChange={handleEditChange}>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Status</label>
            <div className={styles.pillGroup}>
              {STATUSES.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`${styles.pill} ${editForm.status === s ? styles.pillActive: ''}`}
                  onClick={() => setEditForm(prev => ({ ...prev, status: s }))}
                  >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Rating</label>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`${styles.star} ${Number(editForm.rating) >= star ? styles.starActive: ''}`}
                  onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
                  >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Year</label>
            <select className={styles.editInput} name="year" value={editForm.year} onChange={handleEditChange}>
              {Array.from({
                length: 100
              }, (_, i) => new Date().getFullYear() - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.deleteButton} onClick={() => setEditing(false)}>✕ Cancel</button>
          <button className={styles.editButton} onClick={handleSave}>💾 Save Changes</button>
        </div>
      </div>
    ): (
      <div className={styles.bookPageSections}>
        <div className={styles.sectionOne}>
          <p className={styles.bookAvatar}>
            {book.title[0]}
          </p>
          <p className={styles.detailPageTitle}>
            {book.title}
          </p>
          <p className={styles.detailPageAuthor}>
            {book.author}
          </p>
        </div>
        <div className={styles.sectionTwo}>
          {[{
            label: 'Genre', value: book.genre
          },
            {
              label: 'Status', value: book.status
            },
            {
              label: 'Rating', value: '⭐'.repeat(Number(book.rating))
            },
            {
              label: 'Year', value: book.year
            },
          ].map((item) => (
              <div key={item.label} className={styles.detailPageItem}>
                <p className={styles.itemLabel}>
                  {item.label}
                </p>
                <p className={styles.itemValue}>
                  {item.value}
                </p>
              </div>
            ))}
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Delete</button>
          <button className={styles.editButton} onClick={startEdit}>✏️ Edit Details</button>
        </div>
      </div>
    )}
  </div>
</PageTransition>
);
}

export default BookDetail;