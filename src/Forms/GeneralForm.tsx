import React from "react";
import { Formik, Form, ErrorMessage, FieldArray, FastField } from "formik";
import * as Yup from "yup";
interface IFormField {
  name: string;
  type: string;
  value: string;
  username: string;
}

export interface IFormValues {
  username: string;
  password: string;
  fields: IFormField[];
}

interface IFormProps {
  title: string;
  button: string;
  handleSubmit: (values: IFormValues) => Promise<void>;
  validationSchema: Yup.ObjectSchema<IFormValues>;
}

const GeneralForm: React.FC<IFormProps> = ({
  title,
  button,
  handleSubmit,
  validationSchema,
}) => {
  const initialValues: IFormValues = {
    username: "",
    password: "",
    fields: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <h1>{title}</h1>
          <FieldArray name="fields">
            {({ remove }) => (
              <div>
                {values.fields &&
                  values.fields.map((field, index) => (
                    <div key={index}>
                      <label htmlFor={`fields.${index}.username`}>
                        {field.username}
                      </label>
                      <FastField
                        type={field.type}
                        id={`fields.${index}.username`}
                        name={`fields.${index}.username`}
                      />
                      <ErrorMessage
                        name={`fields.${index}.username`}
                        component="div"
                      />
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </FieldArray>

          <button type="submit">{button}</button>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralForm;
