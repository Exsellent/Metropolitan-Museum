import React from "react";
import GeneralForm, { IFormValues } from "../Forms/GeneralForm";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values: IFormValues) => {
    const { username, password } = values;
    dispatch(login({ id: 1, name: username, email: "", password }));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <GeneralForm
        title="Login"
        button="Login"
        handleSubmit={handleSubmit}
        validationSchema={undefined}
      />
    </div>
  );
};

export default LoginPage;
