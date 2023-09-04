import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, HOST } from '../constants/';
import axios from 'axios';

const fetchPlanets = async () => {
  const resp = await axios.get(`${HOST}/planets`);
  return resp?.data?.map(obj => ({ ...obj, available: 1 }));
}

const fetchVehicles = async () => {
  const resp = await axios.get(`${HOST}/vehicles`);
  return resp?.data?.map(obj => ({ ...obj, available: obj.total_no }));
}

const fetchData = async () => {
  const promiseArr = [
    fetchPlanets(),
    fetchVehicles(),
  ]
  const [planets, vehicles] = await Promise.all(promiseArr);
  return { planets, vehicles }
};

export const useGetData = () => {
  const query = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_PLANETS],
    queryFn: fetchData,
    // not caching or auto-refetching -- as data will be put in a form anyways
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    isLoading: query.isLoading,
    data: query.data,
    isError: query.isError,
    error: query.error,
    refetch: () => query.refetch({ throwOnError: true }),
  };
};
