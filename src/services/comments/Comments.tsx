import { Comments } from '@customTypes/Types';
import { commentsServerURL } from 'api';
import axios from 'axios';

export type createCommentType = Pick<Comments, 'desc' | 'parent' | 'replyOnUser'> & {
  slug: string;
  token: string;
};

export type updateCommentType = Pick<Comments, '_id' | 'desc'> & {
  token: string;
  userId: string;
};

export type deleteTypes = {
  token: string;
  commentId: string;
  userId: string;
};

export const createNewComment = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser
}: createCommentType) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post(
      commentsServerURL,
      {
        desc,
        slug,
        parent,
        replyOnUser
      },
      config
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ _id, desc, token, userId }: updateCommentType) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${commentsServerURL}/updateComment`,
      { _id, desc, userId },
      config
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteCommentHandler = async ({ commentId, token, userId }: deleteTypes) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { commentId, userId }
    };
    const { data } = await axios.delete(`${commentsServerURL}`, config);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
