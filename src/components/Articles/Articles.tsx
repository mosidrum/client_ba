import React from 'react';
import Card from './Card';
import { FaArrowDown } from 'react-icons/fa';
import { buttonStyle } from '@constants/styles';

type Props = {};

const Articles = (props: Props) => {
  return (
    <section className="flex flex-col container  mx-auto px-5 sm:px-5 py-10">
      <div className=" flex flex-col md:flex md:flex-row md:flex-nowrap gap-10 pb-10">
        <Card classname="w-40" />
        <Card classname="w-40" />
        <Card classname="w-40" />
      </div>
      <button className={buttonStyle}>
        <span>More articles</span>
        <FaArrowDown className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;
