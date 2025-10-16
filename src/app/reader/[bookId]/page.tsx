
import { books } from "@/lib/books";
import { notFound } from "next/navigation";
import ReaderClient from './ReaderClient';
import React from "react";

type ReaderPageProps = {
  // Use a relaxed type here to avoid Next's generated PageProps mismatch during typecheck.
  params: any;
};

// This is a Server Component. It fetches data.
export default async function ReaderPage({ params }: ReaderPageProps) {
  const { bookId } = (await params) as { bookId: string };
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    notFound();
  }

  // We find the book on the server and pass the complete `book` object to the client component.
  return <ReaderClient book={book} />;
}
