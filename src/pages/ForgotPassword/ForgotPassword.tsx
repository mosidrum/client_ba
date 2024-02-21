import { InputField } from '@components/InputField';
import { MainLayout } from '@components/MainLayout';
import { buttonStyle } from '@constants/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

type Props = {};

const validateEmail = yup.object({
  email: yup.string().required('Email required').email()
});

const ForgotPassword = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateEmail),
    defaultValues: {
      email: ''
    }
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <MainLayout>
      <section className="conatiner mx-auto px-5 py-10">
        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl text-center">Forget Password</h1>
          <InputField name='email' label="email" register={register} errors={errors} />
          <button className={`${buttonStyle} mb-6`} type="submit">
            Send
          </button>
        </form>
      </section>
    </MainLayout>
  );
};

export default ForgotPassword;
