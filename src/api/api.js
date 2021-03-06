const BASE_URL = 'https://mate.academy/students-api';

export const request = (url, options = {}) => {
  return fetch(BASE_URL + url, options)
    .then(res => res.json());
};
