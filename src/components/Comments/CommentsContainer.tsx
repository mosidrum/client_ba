import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { getComments } from '@utils/dummy/comments';
import Comment from './Comment';
import { AffectedCommentType, Comments } from '@customTypes/Types';
import { InvalidateQueryFilters, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  createCommentType,
  createNewComment,
  deleteTypes,
  updateComment,
  updateCommentType,
  deleteCommentHandler
} from '@services/comments';
import { useCustomSnackbar } from '..';

type Props = {
  classname: string;
  loginUserId: string;
  commentsData: Comments[];
  slug: string;
};

const CommentsContainer = ({ classname, loginUserId, commentsData, slug }: Props) => {
  const [affectedComment, setAffectedComment] = useState<AffectedCommentType | null>(null);
  const userState = useSelector((state: any) => state.user);
  const token = userState?.userInfo?.token;
  const userId = userState?.userInfo?._id;
  const queryClient = useQueryClient();

  const { mutate: mutateNewComment, isPending } = useMutation({
    mutationFn: ({ desc, parent, replyOnUser, slug, token }: createCommentType) => {
      return createNewComment({ desc, parent, replyOnUser, slug, token });
    },
    onSuccess: () => {
      useCustomSnackbar('Comment successfully, visible after confirmation', 'success');
    },
    onError: (error) => {
      useCustomSnackbar(error.message, 'error');
      console.log(error);
    }
  });

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ desc, _id, token, userId }: updateCommentType) => {
      return updateComment({ desc, _id, token, userId });
    },
    onSuccess: () => {
      useCustomSnackbar('Comment updated successfully', 'success');
      queryClient.invalidateQueries(['blog', slug] as InvalidateQueryFilters);
    },
    onError: (error) => {
      useCustomSnackbar(error.message, 'error');
      console.log(error);
    }
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ commentId, token, userId }: deleteTypes) => {
      return deleteCommentHandler({ commentId, token, userId });
    },
    onSuccess: () => {
      useCustomSnackbar('Comment deleted successfully', 'success');
    },
    onError: (error) => {
      useCustomSnackbar(error.message, 'error');
      console.log(error);
    }
  });

  const addCommentHandler = (value: string, parent?: string, replyOnUser?: string) => {
    mutateNewComment({ desc: value, parent, replyOnUser, token, slug });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value: string, commentId: string) => {
    mutateUpdateComment({ desc: value, _id: commentId, token, userId });
    setAffectedComment(null);
  };

  const deleteComment = (commentId: string) => {
    mutateDeleteComment({ commentId, token, userId });
  };

  return (
    <div className={`${classname}`}>
      <CommentForm
        label="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isPending}
      />
      <div className="space-y-4 mt-8">
        {commentsData.map((comment) => (
          <Comment
            key={comment?._id}
            comment={comment}
            loginUserId={loginUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addCommentHandler={addCommentHandler}
            updateCommentHandler={updateCommentHandler}
            deleteComment={deleteComment}
            replies={comment?.replies}
            parentId={comment?.parent || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
