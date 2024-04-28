import fs from 'fs';

export const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const endpointCalled = ( endpoint ) => {
  const DATE = new Date();
  console.log(`
  Endpoint called: ${endpoint}
  Date: ${DATE.toDateString()} ${DATE.toTimeString()}
  `)
}