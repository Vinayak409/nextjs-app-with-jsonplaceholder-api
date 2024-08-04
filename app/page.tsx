"use client";
import { useQuery } from "@tanstack/react-query";
import * as _ from "lodash";
import { getAllPhotos } from "./apis/crud-apis";
import { IPhoto } from "./interfaces";
import { PhotosGrid } from "./components";

export default function Home() {
  return <PhotosGrid />;
}
