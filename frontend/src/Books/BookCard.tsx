import { useNavigate } from "react-router";
import { Book } from "../api/book.api";
import { FaStar } from "react-icons/fa";

type BookCardParams = {
  book: Book;
};

const BookCard = ({ book }: BookCardParams) => {
  const navigate = useNavigate();

  return (
    <div
      className="bookcard"
      onClick={() => {
        navigate(`/books/${book._id}`);
      }}
    >
      <img className="book-image" src="/book.jpg" />
      <div className="ratingbox oncard">
        <p className="rating">{book.rating_avg}</p>
        <FaStar color="gold" />
      </div>
      <div className="book-details">
        <p className="booktitle">{book.title}</p>
        <p className="author">{book.author}</p>
        <p className="publisher">{book.publisher}</p>
        <p className="description">{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
