import { SuggestedArticles } from '@components/Articles';
import { CommentsContainer } from '@components/Comments';
import { MainLayout } from '@components/MainLayout';
import { SocialButtons } from '@components/SocialButtons';
import { Navigation } from '@components/navbar';
import { images } from '@constants/images';
import { NavLink, Post } from '@customTypes/Types';
import { getAllPosts, getSinglePost } from '@services/posts';
import { useQuery } from '@tanstack/react-query';
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
import { tags } from '@utils/dummy';

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


export type suggestedArticleType = Post[];

const SingleArticle = () => {
  const params = useParams();
  const slug = params.slug;
  const userState = useSelector((state: any) => state.user);
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      return getSinglePost(slug);
    },
    queryKey: ['blog', slug]
  });

  const { data: suggestedArticles } = useQuery<suggestedArticleType>({
    queryFn: () => {
      return getAllPosts();
    },
    queryKey: ['post']
  });

  useEffect(() => {
    if (data) {
      setBody(generateHTML(data?.body, [Italic, Text, Bold, Paragraph, Document]));
    }
  });

  if (error) {
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
              data={suggestedArticles || []}
              tags={data?.tags}
              header="Latest Article"
            />
            <div className="mt-7 ">
              <h2 className="font-medium text-primary2 mb-4 md:text-xl">Share on:</h2>
              <SocialButtons
                url={encodeURI(window.location.href)}
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
