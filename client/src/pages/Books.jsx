import {
  useState,
  useEffect,
  useRef
} from 'react';
import BookCard from '../components/BookCard';
import PageTransition from '../components/PageTransition.jsx';
import styles from './Books.module.css';

const FILTERS = ['All', 'Reading', 'Completed', 'Want to Read'];

const FILTER_LABELS = {
  'All': 'All',
  'Reading': '📖 Reading',
  'Completed': '✅ Completed',
  'Want to Read': '🔖 Want to Read',
};

function Books( {
  books
}) {
  const [filter,
    setFilter] = useState('All');
  const [search,
    setSearch] = useState('');
  const searchInputRef = useRef(null);

  // Auto-focus search on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  },
    []);
    
     

  const filtered = books
  .filter(book => filter === 'All' || book.status === filter)
  .filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <div className={styles.bookPage}>
        <div className={styles.stickyHeader}>
          <div className={styles.searchWrapper}>
  <span className={styles.searchIcon}>🔍</span>
  <input
    ref={searchInputRef}
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by title or author..."
    className={styles.searchInput}
  />
  {search && (
    <button 
      type="button" 
      className={styles.clearBtn} 
      onClick={() => {
        setSearch('');
        searchInputRef.current.focus(); // Keep the keyboard open on mobile
      }}
      aria-label="Clear search"
    >
      {/* Modern Close Icon SVG */}
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  )}
</div>


        <div className={styles.filterBar}>
          {FILTERS.map(status => (
            <button
              key={status}
              className={`${styles.filterBtn} ${filter === status ? styles.filterBtnActive: ''}`}
              onClick={() => setFilter(status)}
              >
              {FILTER_LABELS[status]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultsInfo}>
        Showing {filtered.length} {filtered.length === 1 ? 'book': 'books'}
      </div>

      <div className={styles.bookList}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>
              🕵️‍♂️
            </p>
            <p className={styles.emptyTitle}>
              No matches found
            </p>
            <p className={styles.emptySubtitle}>
              Try adjusting your search or filters
            </p>
          </div>
        ): (
          filtered.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        )}
      </div>
    </div>
  </PageTransition>
);
}

export default Books;