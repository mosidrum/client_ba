import axios from 'axios';

type Props = {
  email: string;
  password: string;
  name: string;
};

type LoginProps = {
  email: string;
  password: string;
};

export const Signup = async ({ name, email, password }: Props) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/users/register', {
      name,
      email,
      password
    });
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export const SignIn = async ({ email, password }: LoginProps) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/users/login', {
      email,
      password
    });
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
