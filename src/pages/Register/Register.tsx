import { MainLayout } from '@components/MainLayout';
import { buttonStyle } from '@constants/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '@components/InputField';
import { paths } from '@routes/paths';
import { useEffect, useState } from 'react';
import { PasswordField } from '@components/PasswordField';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@services/users';
import { GlobalPopup } from '@components/GlobalPopup';
import { useSnackbar } from 'notistack';
import { useCustomSnackbar } from '@components/CustomSnackbarOptions';
import { userActions } from '@store/userReducers';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  email: string;
  password: string;
  name: string;
};

const validationSchema = yup
  .object({
    name: yup.string().required('Name is required').min(3, 'Not a valid name'),
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match')
  })
  .required();

const Register = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const { mutate } = useMutation({
    mutationFn: ({ name, email, password }: Props) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      setShowAlert(true);
    },
    onError: (error: Error) => {
      useCustomSnackbar(error.message, 'error');
      console.log(error);
    }
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: any) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  useEffect(() => {
    if (userState.userInfo) {
      setShowAlert(true)
      setTimeout(() => {
        navigate(paths.login)
      }, 5000)
    }
  });

  return (
    <MainLayout>
      <section className="conatiner mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          {showAlert ? (
            <GlobalPopup
              type="sucess"
              name="login"
              message="Registration successful!"
              setShowAlert={setShowAlert}
            />
          ) : (
            <>
              <h1 className="text-3xl text-center mb-8">Sign Up</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField name="name" label="name" register={register} errors={errors} />
                <InputField name="email" label="email" register={register} errors={errors} />
                <PasswordField
                  name="password"
                  label="password"
                  register={register}
                  errors={errors}
                />
                <PasswordField
                  name="confirm password"
                  label="confirmPassword"
                  register={register}
                  errors={errors}
                />
                <button type="submit" className={`mt-4 ${buttonStyle}`}>
                  Register
                </button>
                <div className="my-6">
                  Already have ab account?{' '}
                  <span className="hover:cursor-pointer" onClick={() => navigate(paths.login)}>
                    {' '}
                    Sign In
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
