import { useMutation } from '@tanstack/react-query';
import { HOST } from '../constants/';
import axios from 'axios';

const getToken = async () => {
  const resp = await axios.post(`${HOST}/token`);
  return resp.data.token;
}

const mutationFn = async (data) => {
  const token = await getToken();
  const resp = await axios.post(`${HOST}/find`, {
    ...data,
    token,
  });
  return resp.data;
}

export const useCheckResult = () => {
  const mutation = useMutation({
    mutationFn,
  });
  return mutation;
};
