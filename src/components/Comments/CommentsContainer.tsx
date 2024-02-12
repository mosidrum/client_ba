import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { getComments } from '@utils/dummy/comments';
import Comment from './Comment';
import { v4 as uuidv4 } from  'uuid'
import { AffectedCommentType, CommentType } from '@customTypes/Types';

type Props = {
  classname: string;
  loginUserId: string;
};

type AddCommentHandlerType = {
  value: string;
  parent: string | number | null;
  replyOnUser: string | number | null;
};

const CommentsContainer = ({ classname, loginUserId }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [affectedComment, setAffectedComment] = useState<AffectedCommentType | null>(null);
  const mainComments = comments.filter((comments) => comments.parent === null);
  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getComments();
      setComments(commentData);
    })();
  }, []);

  const addCommentHandler = (value: string, parent = null, replyOnUser = null) => {
    const addNewComment = {
      _id: uuidv4(),
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
    setComments((prevComments) => [...prevComments, addNewComment]);
    setAffectedComment(null);
  };

  const updateCommentHandler = (value: string, commentId: string | number) => {
    const updatedComments = comments.map((comment) => {
      if(comment._id === commentId) {
        return {...comment, desc: value}
      }
      return comment;
    })
    setComments(updatedComments)
    setAffectedComment(null);
  }

  return (
    <div className={`${classname}`}>
      <CommentForm label="Send" formSubmitHandler={(value) => addCommentHandler(value)} />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loginUserId={loginUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addCommentHandler={addCommentHandler}
            updateCommentHandler={updateCommentHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
