import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  // useQueryClient is used to get the query client
  // The query client is used to manage the cache and the queries
  // It is used to invalidate the cache and refetch the data
  // It is used to update the cache with the new data
  const queryClient = useQueryClient();

  // useMutation is used to create a mutation
  // A mutation is a function that will be called to create, update or delete data
  // It is used to create a new todo
  // It takes an object with the following properties:
  // mutationFn: The function that will be called to create the todo
  // onSuccess: The function that will be called when the mutation is successful
  // onError: The function that will be called when the mutation fails
  // onSettled: The function that will be called when the mutation is either successful or fails
  // onMutate: The function that will be called when the mutation is triggered
  // mutationKey: The key for the mutation
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: async (todo: Todo) => {
      return await axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onSuccess: (savedTodo) => {
      // Update the cache with the new todo
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        ...(todos || []),
        savedTodo,
      ]);

      // Clear the input field after successful submission
      if (ref.current) ref.current.value = "";
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
    },
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!ref.current?.value) return;
          // Optimistically update the UI
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: false,
            userId: 1,
          });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
