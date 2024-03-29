import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required!")
    .oneOf([yup.ref("password")], "Confirm password is not match!"),
  firstName: yup.string().required("Firstname is required!"),
  lastName: yup.string().required("Lastname is required!"),
});
