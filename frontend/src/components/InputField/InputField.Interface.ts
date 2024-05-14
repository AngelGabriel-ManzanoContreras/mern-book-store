export interface InputFieldProps {
  type      : string;
  name      : string;
  label?    : string;
  value?    : string | number;
  required? : boolean;
  accept?   : string;
  onChange  : (e: React.ChangeEvent<HTMLInputElement>) => void;
}