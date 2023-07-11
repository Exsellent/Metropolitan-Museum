import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IRegistrationFormProps {
  validationSchema: Yup.ObjectSchema<{
    username: string;
    password: string;
  }>;
}

const RegistrationForm: React.FC<IRegistrationFormProps> = ({
  validationSchema,
}) => {
  const initialValues = {
    username: "",
    password: "",
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      // Handle registration logic
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
