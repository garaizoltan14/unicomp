import axiosClient from "./axios";

export const getAllBooks = async () => {
  const { data } = await axiosClient.get("/books");
  console.log(data);
};
