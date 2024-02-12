import { images } from '@constants/images';
import { AffectedCommentType, CommentType } from '@customTypes/Types';
import { TbMessage } from 'react-icons/tb';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { useState } from 'react';
import CommentForm from './CommentForm';

type Props = {
  comment: CommentType;
  loginUserId: string;
  affectedComment: AffectedCommentType | null;
  setAffectedComment: (value: AffectedCommentType | null) => void;
  addCommentHandler: (
    value: string,
    repliedCommentId: string | number | null,
    replyOnUserId: string | number | null
  ) => void;
  parentId: string | number | null;
  updateCommentHandler: (value: string, commentId: string) => void;
};

const Comment = ({
  comment,
  loginUserId,
  affectedComment,
  setAffectedComment,
  addCommentHandler,
  parentId = null,
  updateCommentHandler
}: Props) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const isUserLogin = Boolean(loginUserId);
  const commentBelongsToUser = loginUserId === comment.user._id;

  const isReplying =
    affectedComment && affectedComment.type === 'replying' && affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  const isEditing =
    affectedComment && affectedComment.type === 'editing' && affectedComment._id === comment._id;
  const editedCommentId = parentId ? parentId : comment._id;
  const editOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-comment p-3 rounded-lg">
      <img
        src={images.PostProfileImage}
        alt="Comment image"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-secondary text-xs">{comment.user.name}</h5>
        <span className="text-xs mt-1">
          {new Date(comment.createdAt).toLocaleTimeString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit'
          })}
        </span>
        <p className="mt-[10px]">{comment.desc}</p>
        {isEditing && (
          <CommentForm label='Update' key={comment._id} defaultValue={comment.desc} formSubmitHandler={(value) => updateCommentHandler(value, comment._id)} />
        )}
        <div className="flex gap-x-4 items-center mt-3 mb-3">
          {isUserLogin && (
            <button
              onClick={() => {
                setAffectedComment({ type: 'replying', _id: comment._id }),
                  setShowReply(!showReply);
              }}
              className="flex gap-x-1 items-center"
            >
              <TbMessage className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {isUserLogin && commentBelongsToUser && (
            <>
              <button
                onClick={() => {
                  setAffectedComment({ type: 'editing', _id: comment._id }),
                    setShowReply(!showReply);
                }}
                className="flex gap-x-1 items-center"
              >
                <MdOutlineEdit className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button className="flex gap-x-1 items-center">
                <MdDelete className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && showReply && (
          <CommentForm
            label="Reply"
            key={comment._id}
            formSubmitHandler={(value) => addCommentHandler(value, repliedCommentId, replyOnUserId)}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
