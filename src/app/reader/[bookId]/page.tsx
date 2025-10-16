
import { books } from "@/lib/books";
import { notFound } from "next/navigation";
import ReaderClient from './ReaderClient';
import React from "react";

type ReaderPageProps = {
  params: {
    bookId: string;
  };
};

// This is a Server Component. It fetches data.
export default function ReaderPage({ params }: ReaderPageProps) {
  const book = books.find((b) => b.id === params.bookId);

  if (!book) {
    notFound();
  }

  // We find the book on the server and pass the complete `book` object to the client component.
  return <ReaderClient book={book} />;
}
