import pathToUploadPicture from '@constants/pathToUploadPicture';
import { HiOutlineCamera } from 'react-icons/hi';
import React from 'react';
import { buttonStyle } from '@constants/styles';

type Props = {
  avatar: string;
};

const ProfilePicture = ({ avatar }: Props) => {
  return (
    <div className="w-full flex items-center">
      <div className="relative w-32 h-32 rounded-full outline outline-offset-2 outline-1 lutline-primary overflow-hidden ">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {avatar ? (
            <img
              src={pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + avatar}
              className="w-full h-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-full h-full bg-primary2 flex justify-center items-center">
              <HiOutlineCamera className="w-7 h-auto text-background2" />
            </div>
          )}
          <input type="file" className="sr-only" id="profilePicture" />
        </label>
      </div>
      <button className={`${buttonStyle} -ml-[-1n0px]`} type="button">
        Delete
      </button>
    </div>
  );
};

export default ProfilePicture;
