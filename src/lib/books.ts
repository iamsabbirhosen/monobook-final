import type { Book } from './types';

export const books: Book[] = [
  {
    id: '1',
    title: 'জীববিজ্ঞান ১ম পত্র',
    author: 'ড. মোহাম্মদ আবুল হাসান',
    price: 15.50,
    coverImageId: 'biology-cover',
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1BkVRWLTbknw1S9AKk9crJJ0eiHvSlIdf',
  },
  {
    id: '2',
    title: 'পদার্থবিজ্ঞান ২য় পত্র',
    author: 'ড. শাহজাহান তপন',
    price: 18.00,
    coverImageId: 'physics-cover',
    pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
  },
  {
    id: '3',
    title: 'রসায়ন ১ম পত্র',
    author: 'অধ্যাপক হারুন অর রশিদ',
    price: 16.75,
    coverImageId: 'chemistry-cover',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: '4',
    title: 'উচ্চতর গণিত ১ম পত্র',
    author: 'এস.ইউ. আহমেদ',
    price: 17.00,
    coverImageId: 'math-cover',
    pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
  },
  {
    id: '5',
    title: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    author: 'এনসিটিবি',
    price: 12.99,
    coverImageId: 'ict-cover',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];
