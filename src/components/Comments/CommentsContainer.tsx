import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { getComments } from '@utils/dummy/comments';

type Props = {
  classname: string;
};

type CommentType = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  desc: string;
  post: string;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
};

const CommentsContainer = ({ classname }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  console.log(comments);

  useEffect(() => {
    (async() => {
      const commentData = await getComments();
      setComments(commentData);
    })()
  }, [])
  
  const addCommentHandler = (value: string, parent = null, replyOnUser = null) => {
    const addNewComment = {
      _id: '10',
      user: {
        _id: 'a',
        name: 'Mohammad Rezaii'
      },
      desc: value,
      post: '1',
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: '2022-12-31T17:22:05.092+0000'
    };
    setComments((prevComments) => [...prevComments, addNewComment])
  };

  return (
    <div className={`${classname}`}>
      <CommentForm label="Send" formSubmitHandler={(value) => addCommentHandler(value)} />
    </div>
  );
};

export default CommentsContainer;
