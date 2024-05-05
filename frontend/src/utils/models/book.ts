export type Book = {
  _id             : string;
  title           : string;
  author          : string;
  published_date  : string;
  pages           : number;
  language        : string;
  isbn            : string;
  publisher       : string;
  edition         : number;
  category        : string;
  description     : string;
  image           : string;
}

export const BookInput : Book = {
  _id             : '',
  title           : '',
  author          : '',
  published_date  : '',
  pages           : 0,
  language        : '',
  isbn            : '',
  publisher       : '',
  edition         : 0,
  category        : '',
  description     : '',
  image           : '',
}