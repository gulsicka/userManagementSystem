import * as yup from 'yup';

export const NewUserFormValidator = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is a required field"),
    name: yup.string().required()
  });