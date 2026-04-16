import {
  useState,
  useEffect
} from 'react';
import {
  BrowserRouter
} from 'react-router';
import InstallPrompt from './components/InstallPrompt';
import ScrollToTop from './components/ScrollToTop';
import AppRoutes from './AppRoutes';
import {
  ToastProvider
} from './ToastContext';
import './App.css';

const sampleBooks = [{
  id: 1,
  title: "Eloquent JavaScript",
  author: "Marijn Haverbeke",
  genre: "Programming",
  status: "Completed",
  rating: 4,
  year: 2024
},
  {
    id: 2,
    title: "The Holy Bible",
    author: "The Holy Spirit",
    genre: "Spiritual",
    status: "Reading",
    rating: 5,
    year: 2026
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    status: "Want to Read",
    rating: 4,
    year: 2008
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    genre: "Programming",
    status: "Want to Read",
    rating: 5,
    year: 2019
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    status: "Completed",
    rating: 5,
    year: 2018
  },
  {
    id: 6,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self Help",
    status: "Reading",
    rating: 4,
    year: 2016
  },
];

function getInitialBooks() {
  try {
    const stored = localStorage.getItem('bookshelf_books');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return sampleBooks;
}

function App() {
  const [books,
    setBooks] = useState(getInitialBooks);

  useEffect(() => {
    try {
      localStorage.setItem('bookshelf_books', JSON.stringify(books));
    } catch (e) {}
  }, [books]);

  function addBook(newBook) {
    const maxId = books.reduce((max, b) => Math.max(max, b.id), 0);
    setBooks([...books, {
      ...newBook, id: maxId + 1
    }]);
  }

  function updateBook(updatedBook) {
    setBooks(books.map(b => b.id === updatedBook.id ? updatedBook: b));
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AppRoutes books={books} setBooks={setBooks} addBook={addBook} updateBook={updateBook} />
        <InstallPrompt />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;