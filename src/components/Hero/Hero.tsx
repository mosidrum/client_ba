import React from 'react'
import { images } from '@constants/images';
import { TfiSearch } from 'react-icons/tfi';


const topics = ['Design', 'User Experience', 'User Interaction'];

const Hero = () => {
  return (
    <section className="container mt-36 mx-auto flex flex-col px-10 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Peruse the most captivating articles
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Explore an array of enthralling articles, each brimming with fascinating insights and
          captivating narratives. Delve into a world of diverse topics, from cutting-edge science to
          timeless literature, all crafted to engage and inspire.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <TfiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-primary rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none md:py-4"
              type="text"
              placeholder="Search article"
            />
          </div>
          <button className="w-full bg-primary text-background2 font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2 hover:bg-background2 hover:text-primary hover:border-2 hover:border-primary">
            Search
          </button>
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            {topics.map((topic, index) => (
              <li
                key={index}
                className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img className="w-full" src={images.Hero} alt="users are reading articles" />
      </div>
    </section>
  );
}

export default Hero