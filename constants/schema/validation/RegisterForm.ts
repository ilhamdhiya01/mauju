import * as Yup from 'yup';

const AuthRegisterForm = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email address'
    ),
  password: Yup.string().required('Password is required'),
});

export default AuthRegisterForm;
