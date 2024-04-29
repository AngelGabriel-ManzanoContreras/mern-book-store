export const endpointCalled = ( endpoint ) => {
  const DATE = new Date();
  console.log(`
  Endpoint called: ${endpoint}
  Date: ${DATE.toDateString()} ${DATE.toTimeString()}
  `)
}