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

type Props = {};

const validateLogin = yup
  .object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Passwords must be at least 6 characters')
  })
  .required();

const Login = (props: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, watch
  } = useForm({
    resolver: yupResolver(validateLogin),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
          </button>
        </form>
      </section>
    </MainLayout>
  );
};

export default Login;
