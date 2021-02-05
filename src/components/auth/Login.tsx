import firebase from 'firebase';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { CustomTextInput } from 'src/components';
import { CustomButton } from 'src/components/CustomButton';
import { ICredentials } from 'src/constants';
import { userRegister } from 'src/store/user/userActions';

interface ILoginValues {
  email: string;
  password: string;
}

const initialValues: ILoginValues = {
  email: '',
  password: '',
};

interface IProps {
  isSignUp: boolean;
}

export const Login: React.FC<IProps> = ({ isSignUp }) => {
  const dispatch = useDispatch();

  const validationSchema = () =>
    Yup.object({
      email: Yup.string().email('Please enter valid email').required('Email address id required'),
      password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    });

  const handleSubmit = () => {
    dispatch(userRegister(credentials, isSignUp));
    resetForm({});
  };

  const { handleChange, resetForm, values, errors, isValid, dirty } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const credentials: ICredentials = {
    email: values.email,
    password: values.password,
  };

  return (
    <View>
      <CustomTextInput
        error={errors.email}
        onChangeText={handleChange('email')}
        value={values.email}
        placeholder="E-mail"
      />
      <CustomTextInput
        error={errors.password}
        onChangeText={handleChange('password')}
        value={values.password}
        placeholder="Password"
        securePassword
      />
      <CustomButton onPress={handleSubmit} label="Log in" disabled={!isValid || !dirty} />
    </View>
  );
};
