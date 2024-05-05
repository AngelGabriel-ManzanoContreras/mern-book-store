export interface InputFileProps {
  name      : string;
  label?    : string;
  accept    : string;
  required? : boolean;
  onChange  : (e: React.ChangeEvent<HTMLInputElement>) => void;
}