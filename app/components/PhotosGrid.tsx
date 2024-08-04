"use client";

import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import { getAllPhotosWithPagination } from "../apis/crud-apis";
import { IPhoto } from "../interfaces";
import { PhotoModal } from "./AddPhotoModal";

export const PhotosGrid = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPhotos = 5000;
  const totalPages = Math.ceil(totalPhotos / limit);

  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addPhoto = (photo: any) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const {
    data: photosData,
    isError,
    error,
    isLoading,
  } = useQuery<IPhoto[]>({
    queryKey: ["photos-with-pagination", page],
    queryFn: () => getAllPhotosWithPagination({ page, limit }),
  });

  useEffect(() => {
    if (photosData) {
      setPhotos(photosData);
    }
  }, [photosData]);

  if (isError) return <div>Error in fetching Photos</div>;

  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 -ml-12 -mt-12 border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    );
  return (
    <div className="bg-white py-24 sm:py-32">
      <button
        className="absolute bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded right-10"
        onClick={openModal}
      >
        Add Photo
      </button>

      <PhotoModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addPhoto={addPhoto}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Photo Display App In NextJs
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            quam!
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {photos &&
            _.map(photos, (photo) => (
              <article
                key={photo.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs"></div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {photo.title}
                  </h3>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img alt="" src={photo.url} className="w-full bg-gray-50" />
                </div>
              </article>
            ))}
        </div>
        {!isLoading && (
          <div className="flex justify-center items-center">
            <button
              className={`text-blue-500 font-bold py-2 px-4 rounded ${
                page == 1
                  ? "text-blue-300 cursor-not-allowed opacity-50"
                  : "hover:cursor-pointer"
              }`}
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span> Page {page} </span>
            <button
              className={`text-blue-500 font-bold py-2 px-4 rounded ${
                page == totalPages
                  ? "text-blue-300 cursor-not-allowed opacity-50"
                  : "hover:cursor-pointer"
              }`}
              onClick={() =>
                setPage((old) => (old == totalPages ? 1 : old + 1))
              }
              disabled={photos && photos.length < limit}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
