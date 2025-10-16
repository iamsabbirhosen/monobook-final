 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, BookOpen } from 'lucide-react';

import type { Book } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAppContext } from '@/context/AppContext';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addBookToLibrary, isBookInLibrary, isHydrated } = useAppContext();
  const { toast } = useToast();
  const isInLibrary = isBookInLibrary(book.id);

  const coverImage = PlaceHolderImages.find((img) => img.id === book.coverImageId);
  // Prefer using the public cover image stored under /public/cover/{book.id}.jpg
  // Try common image extensions for public cover files. We'll cycle through
  // candidates on error and finally fall back to the placeholder image.
  const coverCandidates = [`/cover/${book.id}.jpg`, `/cover/${book.id}.jpeg`, `/cover/${book.id}.png`];
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>(coverCandidates[0]);

  const handleBuyClick = () => {
    addBookToLibrary(book.id);
    toast({
      title: 'Success!',
      description: `"${book.title}" has been added to your library.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/reader/${book.id}`} className="block overflow-hidden" aria-label={`Read ${book.title}`}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={`Cover of ${book.title}`}
              width={400}
              height={600}
              className="aspect-[2/3] w-full object-cover"
              data-ai-hint={coverImage?.imageHint}
              onError={() => {
                // Try the next candidate extension
                const nextIndex = candidateIndex + 1;
                if (nextIndex < coverCandidates.length) {
                  setCandidateIndex(nextIndex);
                  setImgSrc(coverCandidates[nextIndex]);
                  return;
                }

                // All public candidates failed — fall back to configured placeholder image
                if (coverImage && imgSrc !== coverImage.imageUrl) {
                  setImgSrc(coverImage.imageUrl);
                  return;
                }

                // Nothing available — stop trying (render placeholder div)
                setImgSrc('');
              }}
            />
          ) : (
            // If there's no imgSrc (shouldn't normally happen), show nothing to avoid broken UI
            <div className="aspect-[2/3] w-full bg-muted-foreground/10" />
          )}
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl leading-tight mb-1">
          <Link href={`/reader/${book.id}`} className="hover:text-primary transition-colors">
            {book.title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm">{book.author}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isHydrated && (
          isInLibrary ? (
            <Button asChild className="w-full" variant="secondary">
              <Link href={`/reader/${book.id}`}>
                <BookOpen className="mr-2 h-4 w-4" /> Read Now
              </Link>
            </Button>
          ) : (
            <Button className="w-full" onClick={handleBuyClick}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Buy for {book.price.toFixed(2)} Tk
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
