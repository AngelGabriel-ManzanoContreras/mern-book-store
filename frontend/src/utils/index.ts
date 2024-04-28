export function isValidImage ( file: File ) {
  const validTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ];
  return validTypes.includes( file.type );
}

export function isValidSize ( file: File ) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}