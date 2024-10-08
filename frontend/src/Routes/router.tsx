import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Register from "../Users/Register.tsx";
import Login from "../Users/Login.tsx";
import BookList from "../Books/BookList.tsx";
import { getAllBooks, getBooks } from "../api/book.api.ts";
import BookDetails from "../Books/BookDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "books",
        element: <BookList />,
        loader: async ({}) => {
          const { data } = await getAllBooks();
          return data;
        },
      },
      {
        path: "books/:bookid",
        element: <BookDetails />,
        loader: async ({ params }) => {
          if (params.bookid) {
            const { data } = await getBooks(params.bookid);
            return data;
          }
          return undefined;
        },
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
