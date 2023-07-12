/* eslint-disable no-console */
import { Middleware } from "redux";

const loggerMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.group(action.type);
    console.log("Current action:", action);
    console.log("Current state:", getState());
    const result = next(action);
    console.log("Next state:", getState());
    console.groupEnd();

    return result;
  };

export default loggerMiddleware;
