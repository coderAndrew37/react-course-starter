import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<Todo[]>("/todos"); // Note: Changed to Todo[] since getAll returns an array

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface TodoQuery {
  page: number;
  pageLimit: number;
}

const useTodos = (query: TodoQuery) => {
  return useQuery<Todo[], Error>({
    queryKey: [CACHE_KEY_TODOS, query], // Include query params in the key
    queryFn: () =>
      apiClient.getAll({
        params: query, // Pass query as axios params
      }),
    staleTime: 10 * 1000,
    keepPreviousData: true,
  });
};

export default useTodos;
