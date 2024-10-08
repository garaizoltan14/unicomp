import { getAllReviews } from "../api/review.api";
import { useQuery } from "@tanstack/react-query";

type ReviewListParams = {
  bookid?: string;
};

const ReviewList = ({ bookid }: ReviewListParams) => {
  const { data } = useQuery({
    queryKey: ["getReviewList", bookid],
    queryFn: async () => {
      if (bookid) {
        const { data } = await getAllReviews(bookid);
        return data;
      }
      return [];
    },
  });

  console.log(data);

  return <>Ehhez a könyvhöz nem tartozik még egyetlen értékelés sem.</>;
};

export default ReviewList;
