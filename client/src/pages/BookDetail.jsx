import {
  useState,
  useEffect
} from 'react';
import {
  useParams,
  Link,
  useNavigate
} from 'react-router';
import {
  useToast
} from '../ToastContext';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition.jsx';
import styles from './BookDetail.module.css';

const GENRES = ['Programming', 'Self Help', 'Spiritual', 'Fiction', 'Non-Fiction', 'Science', 'Philosophy'];
const STATUSES = ['Reading', 'Completed', 'Want to Read'];

function BookDetail( {
  books, setBooks, updateBook
}) {
  const {
    showToast
  } = useToast();
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
      showToast('Title and author are required.', 'error');
      return;
    }
    if (Number(editForm.currentPage) > Number(editForm.totalPages)) {
      showToast('Current page cannot exceed total pages', 'error');
    }
    return;
    updateBook( {
      ...editForm, rating: Number(editForm.rating)
    });
    setEditing(false);
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    setBooks(prev => prev.filter(b => b.id !== book.id));
    navigate(-1);
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
        <Header title={book.title} />

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
            <label className={styles.editLabel}>Pages</label>
            <input className={styles.editInput} name="totalPages" value={editForm.totalPages} onChange={handleEditChange}
            placeholder="Total pages"
            />
        </div>
        <div className={styles.editField}>
          <label className={styles.editLabel}>Current page</label>
          <input className={styles.editInput} name="currentPage" value={editForm.currentPage} onChange={handleEditChange}
          placeholder="Current Page"
          />
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
      <div className={styles.bookAvatar}>
        {book?.title?.[0] || "?"}
      </div>

      <h1 className={styles.detailTitle}>
        {book.title}
      </h1>

      <p className={styles.detailAuthor}>
        {book.author}
      </p>

      <span className={styles.statusBadge}>
        {book.status}
      </span>
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
        }, {
          label: "Pages", value: book.totalPages
        }, {
          label: 'Current page', value: book.currentPage
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
        ))} < /div> < div className = {
      styles.actionButtons
      } >
      <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Delete</button>
      <button className={styles.editButton} onClick={startEdit}>✏️ Edit Details</button>
    </div>
    {
    book.fileUrl && (
      <iframe
        src={book.fileUrl}
        className={styles.pdfViewer}
        />
    )} < /div>
    )}
  </div>
</PageTransition>
);
}

export default BookDetail;