import { Book } from "../../utils/models/book";

export interface FormBookProps {
  onSubmit        : ( newBook: Book ) => void;
}