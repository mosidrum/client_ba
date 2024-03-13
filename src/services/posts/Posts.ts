import { postServerURL } from 'api';
import axios from 'axios';

export const getAllPosts = async (searchKeyword: string) => {
  try {
    const { data } = await axios.get(`${postServerURL}?searchKeyword=${searchKeyword}`);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async (slug: string | undefined) => {
  try {
    const { data } = await axios.get(`${postServerURL}/${slug}`);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
