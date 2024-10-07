import axiosClient from "./axios";

export type User = {
  name: string;
  email: string;
  password: string;
  bio?: string;
};

export const createUser = async (userData: User) => {
  try {
    const { data } = await axiosClient.post("/users", userData);
    console.log(data);
    return data;
  } catch (error) {
    return undefined;
  }
};
