import axios from 'axios';
import { ApiKeyCreateRequest } from 'lib/models/api-key';

// eslint-disable-next-line import/prefer-default-export
export const createApiKey = function createApiKey(data: ApiKeyCreateRequest) {
  return axios.post('/ajax/apikeys', data).then((response) => response.data);
};
