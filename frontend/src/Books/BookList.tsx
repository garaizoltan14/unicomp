import { useLoaderData } from "react-router";
import { Book } from "../api/book.api";
import BookCard from "./BookCard";

const BookList = () => {
  const books = useLoaderData() as Book[];

  return (
    <div className="book-container">
      {books ? (
        books.map((book, index) => {
          return (
            <>
              <BookCard key={`booklist#${index}`} book={book} />
            </>
          );
        })
      ) : (
        <div
          style={{
            fontSize: "0.9rem",
            fontStyle: "italic",
            margin: "64px auto",
          }}
        >
          Jelenleg egy könyv sem szerepel a nyilvántartásban.
        </div>
      )}
    </div>
  );
};

export default BookList;
