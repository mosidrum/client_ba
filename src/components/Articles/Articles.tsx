import React, { useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { buttonStyle } from '@constants/styles';
import Card from './Card';
import { useCustomSnackbar } from '@components/CustomSnackbarOptions';
import { getAllPosts } from '@services/posts';
import { useQuery } from '@tanstack/react-query';
import { AllPost, Post } from '@customTypes/Types';
import { ArticlesSkeleton } from '..';

type Props = {
  searchTerm: string;
}

const Articles = ({searchTerm}: Props) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(searchTerm)
  });

  useEffect(() => {
    refetch()
  }, [searchTerm])

  useEffect(() => {
    if (isError) {
      const error = data as any;
      useCustomSnackbar('Failed to fetch posts', 'error');
    }
  }, [isError, data]);
  const posts = (data as AllPost) || {};

  return (
    <section className="flex flex-col container  mx-auto px-5 sm:px-5 py-10">
      <div className="grid mb-4 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto">
        {isLoading ? (
          [...Array(3)].map((item, index) => <ArticlesSkeleton key={index} classname="max-w-md" />)
        ) : (
          posts.data.map((post: Post) => (
            <Card
              key={post._id}
              classname="max-w-md"
              title={post.title}
              caption={post.caption}
              user={post.user}
              createdAt={post.createdAt}
              photo={post.photo}
              slug={post.slug}
            />
          ))
        )}
      </div>
      <button className={buttonStyle}>
        <span>More articles</span>
        <FaArrowDown className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;
