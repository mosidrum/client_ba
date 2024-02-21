import axios from 'axios';

type Props = {
  email: string;
  password: string;
  name: string;
};

export const signup = async ({ name, email, password }: Props) => {
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
    throw new Error( error.message);
  }
};
