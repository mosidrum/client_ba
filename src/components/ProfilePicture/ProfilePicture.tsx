import pathToUploadPicture from '@constants/pathToUploadPicture';
import { HiOutlineCamera } from 'react-icons/hi';
import React, { useState } from 'react';
import { buttonStyle } from '@constants/styles';
import { CropEasy, useCustomSnackbar } from '..';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfilePictureType } from '@components/CropImage/CropEasy';
import { UpdateProfilePicture } from '@services/users';
import { userActions } from '@store/userReducers';

type Props = {
  avatar: string;
};

const ProfilePicture = ({ avatar }: Props) => {
  const [openCrop, setopenCrop] = useState(false);
  const [photo, setPhoto] = useState<any>('');
  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhoto({ url: URL.createObjectURL(file), file });
      setopenCrop(true);
    }
  };

  const handleDeletePicture = () => {
    if (window.confirm('Are you sure you want to delete')) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', '');
        const token = userState.userInfo.token;
        mutate({ token, formData });
      } catch (error: any) {
        useCustomSnackbar('error', error.message);
        console.log(error);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: ({ token, formData }: UpdateProfilePictureType) => {
      return UpdateProfilePicture({ token, formData });
    },
    onSuccess: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(userActions.setUserInfo(data));
      queryClient.invalidateQueries('profile' as InvalidateQueryFilters);
      useCustomSnackbar('Picture Remove Successful!', 'success');
    },
    onError: (error: Error) => {
      useCustomSnackbar(error.message, 'error');
      console.log(error);
    }
  });

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setopenCrop} />,
          document.getElementById('customRoot')!
        )}

      <div className="w-full flex flex-col gap-y-3 items-center">
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
            <input
              type="file"
              className="sr-only"
              id="profilePicture"
              onChange={handleChangePhoto}
            />
          </label>
        </div>
        <button
          onClick={handleDeletePicture}
          className={`${buttonStyle} -ml-[-1n0px]`}
          type="button"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
