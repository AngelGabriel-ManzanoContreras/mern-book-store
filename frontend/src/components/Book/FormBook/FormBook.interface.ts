import { Book } from "../../../utils/models/book";

export interface FormBookProps {
  initialBook?    : Book;
  required?       : boolean;
  onSubmit        : ( newBook: Book ) => void;
  onCancel?       : () => void;
}