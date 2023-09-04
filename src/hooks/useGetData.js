import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, HOST } from '../constants/';
import axios from 'axios';

const fetchData = async () => {
  const promiseArr = [
    axios.get(`${HOST}/planets`),
    axios.get(`${HOST}/vehicles`),
  ]
  const [planets, vehicles] = await Promise.all(promiseArr);
  return {
    planets: planets.data,
    vehicles: vehicles.data,
  }
};

export const useGetData = () => {
  const query = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_PLANETS],
    queryFn: fetchData,
    staleTime: 60_000, // caching for 1 min
    refetchOnWindowFocus: false,
  });
  return {
    isLoading: query.isLoading,
    data: query.data,
    isError: query.isError,
    error: query.error,
    refetch: () => query.refetch({ throwOnError: true }),
    isRefetching: query.isRefetching
  };
};
