import type { ImagePlaceholder } from './placeholder-images';

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageId: ImagePlaceholder['id'];
  pdfUrl: string;
};
