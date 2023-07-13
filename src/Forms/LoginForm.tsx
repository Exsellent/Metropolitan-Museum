import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ILoginFormProps {
  validationSchema: Yup.ObjectSchema<{
    username: string;
    password: string;
  }>;
  handleLogin: (username: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  validationSchema,
  handleLogin,
}) => {
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await handleLogin(values.username, values.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Field type="text" id="username" name="username" />
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
