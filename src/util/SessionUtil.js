export const setSessionItem = (key, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); //보관기한
  sessionStorage.setItem(key, value);
};

export const getSessionItem = (key) => {
  return sessionStorage.getItem(key);
};
