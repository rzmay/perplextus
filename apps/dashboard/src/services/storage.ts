import axios from 'axios';

export const uploadFile = async function uploadFile(file, onUploadProgress) {
  const formData = new FormData();
  formData.append('file', file);

  return axios
    .post('/api/v1/files', formData, { onUploadProgress })
    .then((response) => response.data)
    .catch((err) => err);
};
