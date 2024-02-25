import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CropImage';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfilePicture } from '@services/users';
import { userActions } from '@store/userReducers';
import { useCustomSnackbar } from '..';

interface Photo {
  url: string;
  file: File;
}

export type UpdateProfilePictureType = {
  token: string;
  formData: any;
};

type Props = {
  photo: Photo;
  setOpenCrop: React.Dispatch<React.SetStateAction<boolean>>;
};

const CropEasy = ({ photo, setOpenCrop }: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [cropedAreaPixels, setCropedAreaPixels] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const userState = useSelector((state: any) => state.user);

  const { mutate } = useMutation({
    mutationFn: ({ token, formData }: UpdateProfilePictureType) => {
      return UpdateProfilePicture({ token, formData });
    },
    onSuccess: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(userActions.setUserInfo(data));
      queryClient.invalidateQueries('profile' as InvalidateQueryFilters);
      useCustomSnackbar('Picture Update Successful!', 'success');
      setOpenCrop(false);
    },
    onError: (error: Error) => {
      useCustomSnackbar(error.message, 'error');
      console.log(error);
    }
  });

  const handleCropComplete = (cropedArea: any, cropedAreaPixels: any) => {
    setCropedAreaPixels(cropedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      const cropedImg = await getCroppedImg(photo?.url, cropedAreaPixels);
      const file = new File([cropedImg.file], `${photo?.file.name}`, {
        type: photo?.file.type
      });
      const formData = new FormData();
      formData.append('profilePicture', file);
      const token = userState.userInfo.token;
      mutate({ token, formData });
    } catch (error: any) {
      useCustomSnackbar('error', error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className="font-semibold text-primary2 mb-2">Crop Image</h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            onCropChange={setCrop}
            zoom={zoom}
            onZoomChange={setZoom}
            aspect={1}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          <label
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-800"
            htmlFor="zoomRange"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e: any) => setZoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            onClick={() => setOpenCrop(false)}
            className="px-5 py-2.5 rounded-lg bg-background2 text-primary2 border border-background2 text-sm disabled:opacity-55"
          >
            Cancel
          </button>
          <button
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg bg-primary2 text-background2 border border-primary2 text-sm disabled:opacity-55"
          >
            Crop & upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
