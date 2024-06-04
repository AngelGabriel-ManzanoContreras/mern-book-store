export interface MainButtonProps {
  text      : string;
  onClick?  : () => void;
  disabled? : boolean;
  className?: string;
  type?     : 'button' | 'submit' | 'reset';
}