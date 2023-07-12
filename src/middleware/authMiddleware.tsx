import axios from "axios";
import { Middleware } from "redux";

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === "auth/login/pending") {
    const { username, password } = action.meta.arg;

    axios
      .post("/api/login", { username, password })
      .then((response) => {
        if (response.data.success) {
          store.dispatch({
            type: "auth/login/fulfilled",
            payload: response.data.user,
          });
        } else {
          store.dispatch({
            type: "auth/login/rejected",
            payload: new Error(response.data.error.message),
          });
        }
      })
      .catch((error) => {
        store.dispatch({ type: "auth/login/rejected", payload: error });
      });
  }

  next(action);
};

export default authMiddleware;
