import axios, { AxiosPromise } from 'axios'
import { FoodData } from '../Interface/FoodData';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<FoodData> => {
  try {
    const response = axios.get(API_URL + '/food');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function useFoodData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['food-data'],
    retry: 2
  })

  return {
    ...query,
    data: query.data?.data
  }
}