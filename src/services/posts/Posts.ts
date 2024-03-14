import { postServerURL } from 'api';
import axios from 'axios';

export const getAllPosts = async (searchkeyword = '', page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(`${postServerURL}?searchKeyword=${searchkeyword}&page=${page}&limit=${limit}&limit=${limit}`);
    return {data, headers};
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
