Love the initiative! 🔥 That's exactly the right mindset — build to learn.

Here's your challenge:

---

## 🏗️ Task — Build "BookShelf"

A personal book tracking app where you can manage books you're reading.

---

### Pages Required
- `/` — Home/Dashboard
- `/books` — All books list with search
- `/books/:id` — Book detail page
- `/add` — Add new book form

---

### Each Book Should Have
```js
{
  id: 1,
  title: "Eloquent JavaScript",
  author: "Marijn Haverbeke",
  genre: "Programming",
  status: "Reading", // Reading, Completed, Want to Read
  rating: 4, // 1-5
  year: 2024
}
```

---

### Features Required
| Feature | Hook/Concept |
|---|---|
| Display books list | `useState`, `.map()` |
| Search books by title | `.filter()`, controlled input |
| Add new book | controlled form, lifted state |
| View book details | `useParams` |
| Navigate after adding | `useNavigate` |
| Load sample books on mount | `useEffect` |
| Active nav link | `useLocation` |
| Focus search input on load | `useRef` |
| Multi-page routing | React Router |
| Shared state | Lifting state up |

---

### Bonus Challenges 🔴
- Filter books by status
- Sort by rating
- Delete a book
- Edit a book's status

---

### Rules
- Build it **completely on your own** first
- Only come back if you're truly stuck
- No copying from EduBase — fresh code only! 💪

---

This covers **every single concept** from Days 1-3. Take your time and show me when done! 🚀