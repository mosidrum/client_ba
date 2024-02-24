import { useCustomSnackbar } from '@components/CustomSnackbarOptions';
import { GlobalPopup } from '@components/GlobalPopup';
import { InputField } from '@components/InputField';
import { MainLayout } from '@components/MainLayout';
import { ProfilePicture } from '@components/ProfilePicture';
import { buttonStyle } from '@constants/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProfile, getUserProfile } from '@services/users';
import { userActions } from '@store/userReducers';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

type UpdateProfileType = {
  token: string;
  email: string;
  name: string;
};

const validationSchema = yup
  .object({
    name: yup.string().required('Name is required').min(3, 'Not a valid name'),
    email: yup.string().required('Email is required').email('Invalid Email')
  })
  .required();

const Profile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state: any) => state.user);
  const token = userState.userInfo.token;

  const {
    data: profileData,
    isLoading,
    error: profileError
  } = useQuery({
    queryFn: () => {
      return getUserProfile(token);
    },
    queryKey: ['profile']
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: ''
    },
    values: isLoading
      ? { email: '', name: '', password: '' }
      : { email: profileData.email, name: profileData.name }
  });

  const { mutate } = useMutation({
    mutationFn: ({ token, name, email }: UpdateProfileType) => {
      return UpdateProfile(token, name, email);
    },
    onSuccess: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(userActions.setUserInfo(data));
      queryClient.invalidateQueries('profile' as InvalidateQueryFilters);
      useCustomSnackbar('Profile update successful!', 'success');
    },
    onError: (error: Error) => {
      useCustomSnackbar(error.message, 'error');
    }
  });

  const onSubmit = (data: any) => {
    const { name, email } = data;
    mutate({ token: userState.userInfo.token, name, email });
  };

  return (
    <MainLayout>
      {' '}
      <section className="conatiner mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl text-center mb-8">Edit Profile</h1>
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField name="name" label="name" register={register} errors={errors} />
            <InputField name="email" label="email" register={register} errors={errors} />
            <button type="submit" className={`mt-4 ${buttonStyle}`}>
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
