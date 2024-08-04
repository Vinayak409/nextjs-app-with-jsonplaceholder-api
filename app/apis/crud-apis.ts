import { instance } from "../config/axios-instance";
import { IPhoto } from "../interfaces/photo.interface";

export const getAllPhotos = async () => {
  const res = await instance.get("/");
  return res?.data;
};

export const getAllPhotosWithPagination = async ({
  page,
  limit,
}: any): Promise<IPhoto[]> => {
  const res = await instance.get(`/?_page=${page}&_limit=${limit}`);
  return res?.data;
};
