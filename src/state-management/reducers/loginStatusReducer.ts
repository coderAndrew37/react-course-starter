interface Login {
  type: "LOGGED_IN" | "LOGGED_OUT";
  user: string;
}

interface Logout {
  type: "LOGGED_OUT";
}

type Action = Login | Logout;

const loginStatusReducer = (status: string, action: Action): string => {
  if (action.type === "LOGGED_IN") {
    return action.user;
  }
  if (action.type === "LOGGED_OUT") {
    return "";
  }
  return status;
};

export default loginStatusReducer;
