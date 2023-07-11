import React from "react";
import { Formik, Form, ErrorMessage, FieldArray, FastField } from "formik";

import * as Yup from "yup";

interface IFormValues {
  username: string;
  password: string;
  fields: { name: string; type: string; value: string }[];
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
            {({ push, remove }) => (
              <div>
                {values.fields.map((field, index) => (
                  <div key={index}>
                    <label htmlFor={`fields.${index}.name`}>{field.name}</label>
                    <FastField
                      type={field.type}
                      id={`fields.${index}.name`}
                      name={`fields.${index}.name`}
                    />
                    <ErrorMessage
                      name={`fields.${index}.name`}
                      component="div"
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: "", type: "text", value: "" })}
                >
                  Add field
                </button>
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
