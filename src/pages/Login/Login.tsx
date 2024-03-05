import { InputField } from '@components/InputField';
import { MainLayout } from '@components/MainLayout';
import { buttonStyle } from '@constants/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { paths } from '@routes/paths';
import { Alert } from '@components/Alert';
import { PasswordField } from '@components/PasswordField';
import { useMutation } from '@tanstack/react-query';
import { useCustomSnackbar } from '@components/CustomSnackbarOptions';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@store/userReducers';
import { SignIn } from '@services/users';
import { Loader } from '@components/Loader';

type LoginProps = {
  email: string;
  password: string;
};

const validateLogin = yup
  .object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Passwords must be at least 6 characters')
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(validateLogin),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => {
      return SignIn({ email, password });
    },
    onSuccess: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(userActions.setUserInfo(data));
      useCustomSnackbar('Login successful', 'success');
      navigate(paths.index);
    },
    onError: (error: Error) => {
      useCustomSnackbar(error.message, 'error');
    }
  });

  const onSubmit = (data: any) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="conatiner mx-auto px-5 py-10">
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <Alert type="error" message="failed to login" />
          <h1 className="text-3xl text-center">Login</h1>
          <InputField name="email" label="email" register={register} errors={errors} />
          <PasswordField name="password" label="password" register={register} errors={errors} />
          <div className="mt-1 hover:cursor-pointer" onClick={() => navigate(paths.forgotPassword)}>
            Forgot password?
          </div>
          <button type="submit" className={`${buttonStyle} m-6`}>
            Login
            {isPending ? (
              <span className="w-8 h-8">
                <Loader />
              </span>
            ) : (
              ''
            )}
          </button>
        </form>
      </section>
    </MainLayout>
  );
};

export default Login;
