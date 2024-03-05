import { SuggestedArticles } from '@components/Articles';
import { CommentsContainer } from '@components/Comments';
import { MainLayout } from '@components/MainLayout';
import { SocialButtons } from '@components/SocialButtons';
import { Navigation } from '@components/navbar';
import { images } from '@constants/images';
import { NavLink, Post } from '@customTypes/Types';
import { getSinglePost } from '@services/posts';
import { useQuery } from '@tanstack/react-query';
import { tags } from '@utils/dummy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import pathToUploadPicture from '@constants/pathToUploadPicture';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import { generateHTML } from '@tiptap/react';
import parse from 'html-react-parser';
import { ArticlesDetailsSkeleton } from '@components/Skeleton';
import { useCustomSnackbar } from '@components/CustomSnackbarOptions';
import { useSelector } from 'react-redux';


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

type singlePostType = Pick<Post, 'title' | 'photo' | 'caption'>;

export type suggestedArticle = Pick<Post, '_id' | 'photo' | 'title' | 'createdAt'>;

const exampleArticle: suggestedArticle[] = [
  {
    _id: 'we345djdo3k3ndnj5',
    photo: images.PostImage,
    title: 'Help children get better education',
    createdAt: '2023-01-28T15:35:35.607+0000'
  },
  {
    _id: 'we3459owndnj5',
    photo: images.PostImage,
    title: 'Help children get better education',
    createdAt: '2023-01-28T15:35:35.607+0000'
  },
  {
    _id: 'oke443dki9o59owndnj5',
    photo: images.PostImage,
    title: 'Help children get better education',
    createdAt: '2023-01-28T15:35:35.607+0000'
  }
];

const SingleArticle = () => {
  const params = useParams();
  const post = params.slug;
  const userState = useSelector((state: any) => state.user);
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      return getSinglePost(post);
    },
    queryKey: ['post'],
    staleTime: 2000
  });
  console.log(data);
  
  useEffect(() => {
    if (data) {
      setBody(generateHTML(data?.body, [Italic, Text, Bold, Paragraph, Document]));
    }
  });

  if(error) {
    useCustomSnackbar('Something went wrong', 'error');
  }

  return (
    <MainLayout>
      {isLoading ? (
        <ArticlesDetailsSkeleton />
      ) : (
        <section className="container max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-20 lg:items-start lg:mx-auto">
          <article className="flex-1">
            <Navigation Links={navLink} />
            <img
              className="rounded-xl w-full"
              src={
                data?.photo
                  ? pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + data.photo
                  : images.noPostImage
              }
              alt="article"
            />
            <div className="text-primary text-sm inline-block mt-4 md:text-base">
              {data?.categories.map((category: any) => (
                <div onClick={() => setCategory(category.name)}>{category.name}</div>
              ))}
            </div>
            <h1 className="text-xl font-medium mt-4 text-primary2 md:text-[26px]">{data?.title}</h1>
            <div className="mt-4 text-primary">
              <p dangerouslySetInnerHTML={{ __html: body }} className="leading-7 text-justify "></p>
            </div>
            <CommentsContainer
              loginUserId={userState?.userInfo?._id}
              classname="mt-10"
              commentsData={data?.comments}
              slug={data?.slug}
            />
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
      )}
    </MainLayout>
  );
};

export default SingleArticle;
