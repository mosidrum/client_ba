import { InputField } from '@components/InputField';
import { MainLayout } from '@components/MainLayout';
import { PasswordField } from '@components/PasswordField';
import { buttonStyle } from '@constants/styles';
import React, { useState } from 'react';

type Props = {};

const Register = (props: Props) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: ''
    }));
  };

  const handleEmailChange = (name: string, value: string) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
    validateEmail(value);
  };

  const validateEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email'
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
  };
  return (
    <MainLayout>
      <section className="conatiner mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8 text-primary2">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              name="name"
              placeholder="Enter you name"
              error={errors.name}
              value={formValues.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <InputField
              name="email"
              placeholder="Enter your email"
              error={errors.email}
              value={formValues.email}
              onChange={(e) => handleEmailChange('email', e.target.value)}
            />
            <PasswordField
              name="password"
              placeholder="Enter password"
              value={formValues.password}
              error={errors.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <button type="submit" className={buttonStyle}>
              Register
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
