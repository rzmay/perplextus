import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

type LoginData = {
  email: string;
};

// eslint-disable-next-line import/prefer-default-export
export const login = function login(data: LoginData, params: ParsedUrlQuery) {
  return axios.post('/ajax/auth/login/email', data, { params })
    .then((response) => response.data);
};
