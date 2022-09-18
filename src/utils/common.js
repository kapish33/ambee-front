export const finalUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_DEV //REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD;
};
