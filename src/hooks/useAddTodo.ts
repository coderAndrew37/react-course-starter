import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./useTodos";
import { CACHE_KEY_TODOS } from "../react-query/constants";

interface AddTodoContext {
  previousTodos: Todo[] | undefined;
}
const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: async (todo: Todo) => {
      return await axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },

    onMutate: (newTodo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>([CACHE_KEY_TODOS]) || [];

      // Update the cache with the new todo
      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], (todos) => [
        ...(todos || []),
        newTodo,
      ]);

      onAdd();

      // Return the previous todos to rollback the optimistic update
      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(
        CACHE_KEY_TODOS,
        (todos) =>
          todos?.map((todo) => (todo === newTodo ? savedTodo : todo)) || []
      );
    },

    onError: (error, newTodo, context) => {
      // If the mutation fails, rollback the optimistic update
      // The context is the value returned from onMutate
      // The context is used to rollback the optimistic update
      // The context is the previous todos
      if (!context) return;

      // Update the cache with the previous todos
      // Rollback the optimistic update
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
