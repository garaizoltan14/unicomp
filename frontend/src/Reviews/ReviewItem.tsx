import { Review } from "../api/review.api";

type ReviewProps = {
  review: Review;
};

const ReviewItem = ({ review }: ReviewProps) => {
  return (
    <div className="review">
      <p></p>
    </div>
  );
};

export default ReviewItem;
