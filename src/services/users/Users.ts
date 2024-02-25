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

type updateProfilePicture ={
  token: string;
  formData: any;
}

const serverURL = 'http://localhost:8000/api/users/';

export const Signup = async ({ name, email, password }: Props) => {
  try {
    const { data } = await axios.post(`${serverURL}register`, {
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
    const { data } = await axios.post(`${serverURL}login`, {
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

export const getUserProfile = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.get(`${serverURL}profile`, config);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const UpdateProfile = async (token: string, name: string, email: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(`${serverURL}updateProfile`, { name, email }, config);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const UpdateProfilePicture = async ({token, formData}: updateProfilePicture) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(`${serverURL}updateProfilePicture`, formData, config);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
