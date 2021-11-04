import { request } from './api';

export const getTodos = () => {
  return request('/todos');
};
