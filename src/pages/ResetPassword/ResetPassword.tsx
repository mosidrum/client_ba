import { MainLayout } from '@components/MainLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { buttonStyle } from '@constants/styles';
import { PasswordField } from '@components/PasswordField';

type Props = {};

const validateResetPassword = yup
  .object({
    newPassword: yup
      .string()
      .required('password is required')
      .min(6, 'Passwords must be at least 6 characters'),
    confirmNewPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
  })
  .required();

const ResetPassword = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateResetPassword),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const onSubmit = (data: any) => {
    const { confirmNewPassword, ...formData } = data;
    console.log(formData);
  };

  return (
    <MainLayout>
      <section className="conatiner mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl text-center mb-8">Reset Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PasswordField
              name="new password"
              label="newPassword"
              register={register}
              errors={errors}
            />
            <PasswordField
              name="confirm password"
              label="confirmNewPassword"
              register={register}
              errors={errors}
            />
            <button type="submit" className={`mt-4 ${buttonStyle}`}>
              Reset
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ResetPassword;
