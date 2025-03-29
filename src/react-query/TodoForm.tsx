import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useAddTodo(() => {
    // This function is called after a todo is added
    // You can use this to trigger a refetch or any other side

    // Clear the input field after successful submission
    if (ref.current) ref.current.value = "";
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
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {/* If the mutation is loading, show a spinner */}
            {/* Otherwise, show the text "Add" */}
            {/* The button is disabled if the mutation is loading */}
            {addTodo.isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Submitting...
              </>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

// The form is a controlled component
// The input field is controlled by the ref
// The input field is cleared after successful submission
// The form is submitted when the button is clicked
// The form is submitted when the enter key is pressed
export default TodoForm;
