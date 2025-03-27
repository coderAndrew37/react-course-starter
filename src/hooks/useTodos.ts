import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"], // This is the key for the query ie unique identifier
    queryFn: fetchTodos, // This is the function that will be called to fetch the data
    staleTime: 10 * 1000, // This is the time in milliseconds after which the data will be considered stale
  });
};

export default useTodos;
