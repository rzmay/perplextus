import axios from 'axios';
import { BucketCreateRequest } from 'lib/models/bucket';

// eslint-disable-next-line import/prefer-default-export
export const createBucket = function createBucket(data: BucketCreateRequest) {
  return axios.post('/api/v1/buckets', data).then((response) => response.data);
};
