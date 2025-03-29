import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface todoQuery {
  page: number;
  pageLimit: number;
}

const useTodos = (query: todoQuery) => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params: {
          _start: (query.page - 1) * query.pageLimit,
          _limit: query.pageLimit,
        },
      })
      .then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: [CACHE_KEY_TODOS, query], // This is the key for the query ie unique identifier
    queryFn: fetchTodos, // This is the function that will be called to fetch the data
    staleTime: 10 * 1000, // This is the time in milliseconds after which the data will be considered stale
    keepPreviousData: true, // This will keep the previous data while the new data is being fetched
  });
};

export default useTodos;
