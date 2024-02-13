import { SuggestedArticles } from '@components/Articles';
import { CommentsContainer } from '@components/Comments';
import { MainLayout } from '@components/MainLayout';
import { SocialButtons } from '@components/SocialButtons';
import { Navigation } from '@components/navbar';
import { images } from '@constants/images';
import { NavLink, Post, suggestedArticle } from '@customTypes/Types';
import { tags } from '@utils/dummy';
import React from 'react';

const navLink: NavLink[] = [
  {
    name: 'Home',
    path: 'home'
  },
  {
    name: 'Articles',
    path: 'articles'
  }
];

const exampleArticle: suggestedArticle[] = [
  {
    _id: 'we345djdo3k3ndnj5',
    image: images.PostImage,
    title: 'Help children get better education',
    createdAt: '2023-01-28T15:35:35.607+0000'
  },
  {
    _id: 'we3459owndnj5',
    image: images.PostImage,
    title: 'Help children get better education',
    createdAt: '2023-01-28T15:35:35.607+0000'
  },
  {
    _id: 'oke443dki9o59owndnj5',
    image: images.PostImage,
    title: 'Help children get better education',
    createdAt: '2023-01-28T15:35:35.607+0000'
  }
];

const SingleArticle = () => {
  return (
    <MainLayout>
      <section className="container max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-20 lg:items-start lg:mx-auto">
        <article className="flex-1">
          <Navigation Links={navLink} />
          <img className="rounded-xl w-full" src={images.PostImage} alt="article" />
          <div className="text-primary text-sm inline-block mt-4 md:text-base">EDUCATION</div>
          <h1 className="text-xl font-medium mt-4 text-primary2 md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-primary">
            <p className="leading-7 text-justify ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit deleniti ad ut
              libero inventore illo excepturi atque porro optio sunt, perferendis enim! Tempora
              neque itaque natus nobis maiores beatae a quae voluptatum unde temporibus laborum
              officia aliquid veniam adipisci quidem necessitatibus, nulla voluptas nostrum sapiente
              optio quos? Impedit nesciunt a mollitia hic assumenda. Deserunt nisi illo, nulla
              voluptatibus cumque cupiditate natus totam provident maiores nostrum dolore culpa sed
              magnam hic eum reiciendis vero, molestias praesentium dolorum quis enim, fuga ipsam
              voluptate? Soluta quisquam, dolorem ducimus repellat optio unde qui dolores incidunt
              architecto. Possimus porro veniam praesentium quibusdam quasi assumenda consequuntur!
            </p>
          </div>
          <CommentsContainer loginUserId="a" classname="mt-10" />
        </article>
        <div>
          <SuggestedArticles
            classname="mt-8 lg:mt-0 max-w-xs"
            data={exampleArticle}
            tags={tags}
            header="Latest Article"
          />
          <div className="mt-7 ">
            <h2 className="font-medium text-primary2 mb-4 md:text-xl">Share on:</h2>
            <SocialButtons
              url={encodeURI('https://web.facebook.com/?_rdc=1&_rdr')}
              title={encodeURIComponent('my facebook')}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SingleArticle;
