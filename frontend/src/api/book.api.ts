import axiosClient from "./axios";

export type Book = {
  _id: string;
  author: string;
  title: string;
  publisher: string;
  description?: string;
  rating_avg?: number;
  price?: number;
  reviews?: [];
};

export const getAllBooks = async () => {
  try {
    const { data } = await axiosClient.get("/books");
    return data;
  } catch (error) {
    return undefined;
  }
};

export const getBooks = async (bookid: string) => {
  try {
    const { data } = await axiosClient.get(`/books/${bookid}`);
    return data;
  } catch (error) {
    return undefined;
  }
};
