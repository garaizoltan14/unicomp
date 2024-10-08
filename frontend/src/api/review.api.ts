import axiosClient from "./axios";

export type Review = {
  owner: string;
  book: string;
  rating: string;
  text: string;
};

export const getAllReviews = async (bookid: string) => {
  try {
    const { data } = await axiosClient.get(`/books/${bookid}/reviews`);
    return data;
  } catch (error) {
    return undefined;
  }
};
