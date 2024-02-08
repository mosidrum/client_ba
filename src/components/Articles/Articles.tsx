import React from 'react';
import Card from './Card';

type Props = {};

const Articles = (props: Props) => {
  return (
    <section className='px-10 flex flex-col md:flex md:flex-row md:flex-nowrap gap-10'>
      <Card classname="w-40" />
      <Card classname="w-40" />
      <Card classname="w-40" />
    </section>
  );
};

export default Articles;
