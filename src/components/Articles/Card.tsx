import { images } from '@constants/images';
import { MdVerified } from 'react-icons/md';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@routes/paths';
import { Post } from '@customTypes/Types';
import { formatDate } from '@utils/functions';
import { GoUnverified } from 'react-icons/go';
import pathToUploadPicture from '@constants/pathToUploadPicture';

type Props = Pick<Post, 'title' | 'caption' | 'user' | 'createdAt' | 'photo' | 'slug'> & {
  classname: string;
};

const Card = ({ classname, title, caption, user, photo, createdAt, slug }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={`rounded-xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${classname}`}>
      <div className='cursor-pointer' onClick={() => navigate(`${paths.readArticle}/${slug}`)}>
        <img
          src={photo ? pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + photo : images.noPostImage}
          alt="post image"
          className="w-full object-cover object-center h-auto md:h- lg:h-48 xl:h-60 hover:cursor-pointer"

        />
        <h2 className="font-bold text-primary2 text-1xl lg:text-[18px] p-5">{title}</h2>
      </div>
      <div className="pb-5 px-5">
        <p className="text-primary mt-3 text-sm md:text-lg">{caption}</p>
        <div className="flex items-center justify-between flex-nowrap mt-6 md:flex-col lg:flex-row">
          <div className="flex md:justify-between gap-x-2 md:gap-x-2.5 md:flex-row">
            <img
              src={
                user.avatar
                  ? pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + user.avatar
                  : images.noProfileImage
              }
              alt="User profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col items-center">
              <strong className="text-primary2 ">{user.name}</strong>
              {user.verified ? (
                <span className="text-sm italic flex items-center">
                  {' '}
                  <MdVerified color="green" className="w-4 h-4" />
                  Verified writer
                </span>
              ) : (
                <span className="text-sm italic flex items-center">
                  {' '}
                  <GoUnverified color="red" className="w-4 h-4" />
                  Unverified writer
                </span>
              )}
            </div>
          </div>
          <span className="italic text-sm">{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
