import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { getComments } from '@utils/dummy/comments';
import Comment from './Comment';
import { AffectedCommentType, CommentType } from '@customTypes/Types';

type Props = {
  classname: string;
  loginUserId: string;
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

  const addCommentHandler = (value: string, parent?: string, replyOnUser?: string) => {
    const addNewComment = {
      _id: Math.random().toString(),
      user: {
        _id: 'a',
        name: 'Mohammad Rezaii'
      },
      desc: value,
      post: '1',
      parent: parent ?? '',
      replyOnUser: replyOnUser ?? '',
      createdAt: new Date().toISOString()
    };
    setComments((prevComments) => [...prevComments, addNewComment]);
    setAffectedComment(null);
  };

  const updateCommentHandler = (value: string, commentId: string | number) => {
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value };
      }
      return comment;
    });
    setComments(updatedComments);
    setAffectedComment(null);
  };

  const deleteComment = (commentId: number | string) => {
    const updatedComments = comments.filter((comment) => {
      return comment._id !== commentId
    });
    setComments(updatedComments);
  };

  const getReplies = (commentId: string | number) => {
    return comments.filter((comment) => comment.parent === commentId)
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })
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
            deleteComment={deleteComment}
            replies={getReplies(comment._id)}
            parentId={comment.parent || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
