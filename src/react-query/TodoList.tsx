import { useState } from "react";
import useTodos from "../hooks/useTodos";

const TodoList = () => {
  const pageLimit = 10;
  const [page, setPage] = useState(1);
  //Implementing catching using react-query
  const { data: todos, error, isLoading } = useTodos({ page, pageLimit });

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul className="list-group">
        {todos?.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex justify-content-between">
        <button
          disabled={page === 1}
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
        >
          previous
        </button>

        <button
          disabled={!todos?.length}
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
        >
          next
        </button>
      </div>
    </>
  );
};

export default TodoList;
