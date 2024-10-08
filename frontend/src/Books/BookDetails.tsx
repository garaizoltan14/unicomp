import { useLoaderData } from "react-router";
import { Book } from "../api/book.api";
import { FaStar } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import ReviewList from "../Reviews/ReviewList";

const BookDetails = () => {
  const book = useLoaderData() as Book;

  return (
    <>
      <div className="bookDetails">
        <div className="image-holder">
          <img src="/book.jpg" />
        </div>
        <div className="details-holder">
          <p className="details-title">{book.title}</p>
          <p className="details-author">{book.author}</p>
          <p className="details-publisher">{book.publisher}</p>
          <p className="details-description">
            {book.description || "Ehhez a könyvhöz nem található leírás."}
          </p>

          <div className="ratingbox ondetails">
            <p>{book.rating_avg}</p>
            <FaStar color="gold" />
          </div>
        </div>
      </div>
      <div className="buttons-holder">
        <button className="editbutton">
          <MdModeEdit />
          <span>Szerkesztés</span>
        </button>
        <button className="editbutton">
          <FaRegCommentDots />
          <span>Értékelés írása</span>
        </button>
      </div>
      <div className="reviews-holder">
        <ReviewList />
      </div>
    </>
  );
};

export default BookDetails;
