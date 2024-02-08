import { images } from '@constants/images';
import { MdVerified } from 'react-icons/md';
import React from 'react';

type Props = {
  classname: string;
};

const Card = (classname: Props) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${classname}`}>
      <img
        src={images.PostImage}
        alt="post image"
        className="w-full object-cover object-center h-auto md:h- lg:h-48 xl:h-60"
      />
      <div className="p-5">
        <h2 className="font-bold text-primary2 text-2xl lg:text-[28px]">Future work</h2>
        <p className="text-primary mt-3 text-sm md:text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis?
        </p>
        <div className="flex justify-between flex-nowrap items-center mt-6 md:flex-col lg:flex-row">
          <div className="flex items-center gap-x-2 md:gap-x-2.5 md:flex-row">
            <img src={images.User} alt="User profile" className="w-9 h-9 md:w-10 md:h-10" />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-primary2 text-sm md:text-base ">
                Ayodele Isaac
              </h4>
              <div className="flex items-center">
                <span className="w-fit bg-opacity-20 p-1.5 rounded-full">
                  <MdVerified color="green" className="w-4 h-4" />
                </span>
                <span className="italic text-sm md:text-sm">Verified writer</span>
              </div>
            </div>
          </div>
          <span className="italic text-sm md:text-base">02 June 2024</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
