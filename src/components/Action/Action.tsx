import { images } from '@constants/images';
import { buttonStyle } from '@constants/styles';
import React from 'react';

type Props = {};

const Action = ({}: Props) => {
  return (
    <>
      <svg
        id="wave"
        className="w-full h-auto max-h-40 translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 220"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(92, 0, 0, 1)" offset="0%"></stop>
            <stop stopColor="rgba(92, 0, 0, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          fill="url(#sw-gradient-0)"
          d="M0,0L60,14.7C120,29,240,59,360,77C480,95,600,103,720,88C840,73,960,37,1080,25.7C1200,15,1320,29,1440,36.7C1560,44,1680,44,1800,55C1920,66,2040,88,2160,95.3C2280,103,2400,95,2520,80.7C2640,66,2760,44,2880,51.3C3000,59,3120,95,3240,91.7C3360,88,3480,44,3600,33C3720,22,3840,44,3960,66C4080,88,4200,110,4320,128.3C4440,147,4560,161,4680,161.3C4800,161,4920,147,5040,124.7C5160,103,5280,73,5400,62.3C5520,51,5640,59,5760,51.3C5880,44,6000,22,6120,11C6240,0,6360,0,6480,14.7C6600,29,6720,59,6840,58.7C6960,59,7080,29,7200,25.7C7320,22,7440,44,7560,47.7C7680,51,7800,37,7920,51.3C8040,66,8160,110,8280,132C8400,154,8520,154,8580,154L8640,154L8640,220L8580,220C8520,220,8400,220,8280,220C8160,220,8040,220,7920,220C7800,220,7680,220,7560,220C7440,220,7320,220,7200,220C7080,220,6960,220,6840,220C6720,220,6600,220,6480,220C6360,220,6240,220,6120,220C6000,220,5880,220,5760,220C5640,220,5520,220,5400,220C5280,220,5160,220,5040,220C4920,220,4800,220,4680,220C4560,220,4440,220,4320,220C4200,220,4080,220,3960,220C3840,220,3720,220,3600,220C3480,220,3360,220,3240,220C3120,220,3000,220,2880,220C2760,220,2640,220,2520,220C2400,220,2280,220,2160,220C2040,220,1920,220,1800,220C1680,220,1560,220,1440,220C1320,220,1200,220,1080,220C960,220,840,220,720,220C600,220,480,220,360,220C240,220,120,220,60,220L0,220Z"
        ></path>
      </svg>
      <section className="relative bg-primary2 px-10">
        <div className="container grid grid-cols-12 mx-auto py-10 md:pb-5 lg:place-items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-background2 font-bold text-2xl md:text-4xl md:text-center md:leading-normallg:text-left  ">
              Get stories in your email inbox
            </h2>
            <div className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0">
              <input
                type="text"
                className="px-4 py-3 rounded-lg w-full placeholder:text-primary "
                placeholder="Email address"
              />
              <button className="px-4 py-3 rounded-lg w-full text-background2 font-bold border-2 border-background2 hover:bg-background2 hover:text-primary md:w-fit md:whitespace-nowrap ">
                Get started
              </button>
            </div>
            <p className="text-background2 text-sm leading-7 mt-6 md:text-center md:text-base lg:text-left ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati velit adipisci
              atque? Esse, quidem id iure iusto expedita nihil accusamus?
            </p>
          </div>
          <div className="col-span-12 hidden md:block md:order-first mb-[70px] lg:col-span-6 lg:order-last">
            <div className="w-3/4 mx-auto relative">
              <div className=" w-full bg-background2 p-3 z-[1] relative rounded-xl">
                <img
                  src={images.CallToAction}
                  alt="post image"
                  className="w-full object-cover object-center h-auto md:h- lg:h-48 xl:h-60"
                />
                <div className="p-5">
                  <h2 className="font-bold text-primary2 text-2xl lg:text-[28px]">Future work</h2>
                  <p className="text-primary mt-3 text-sm md:text-lg">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Action;
