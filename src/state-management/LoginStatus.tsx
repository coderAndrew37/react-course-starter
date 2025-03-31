import { useReducer, useState } from "react";
import loginStatusReducer from "./reducers/loginStatusReducer";

const LoginStatus = () => {
  const [user, dispatch] = useReducer(loginStatusReducer, "");

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => dispatch({ type: "LOGGED_OUT" })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a
        onClick={() => dispatch({ type: "LOGGED_IN", user: "Andrew" })}
        href="#"
      >
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
