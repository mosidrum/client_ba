import { useCustomSnackbar } from '@components/CustomSnackbarOptions';
import { Loader } from '@components/Loader';
import { images } from '@constants/images';
import pathToUploadPicture from '@constants/pathToUploadPicture';
import { AllPost } from '@customTypes/Types';
import { getAllPosts } from '@services/posts';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@utils/functions';
import React, { useEffect, useState } from 'react';

type Props = {};

const ManagePost = (props: Props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(searchKeyword, currentPage)
  });

  const posts = data as AllPost;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [searchKeyword, currentPage]);

  return (
    <div className="w-full px-4 mx-auto overflow-hidden">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight font-semibold">Manage Post</h2>
          <div className="text-end">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
            >
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Post title..."
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  value={searchKeyword}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-mdfocus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            {isLoading || isFetching ? (
              <div className="flex justify-center items-center">
                <div className="text-center w-2/4 h-auto">
                  <Loader color="#7a1012" />
                </div>
              </div>
            ) : (
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm text-left bg-white border-b border-gray-200"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm text-primary text-left bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm text-primary text-left bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm text-primary text-left bg-white border-b border-gray-200"
                    >
                      Tags
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm text-primary text-left bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.data.length > 0 ? (
                    posts?.data.map((post) => (
                      <tr key={post._id}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="#" className="relative block">
                                <img
                                  alt="profil"
                                  src={
                                    post.photo
                                      ? pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + post.photo
                                      : images.noPostImage
                                  }
                                  className="mx-auto object-cover rounded-full h-10 w-10 "
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-primary font-bold whitespace-no-wrap">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-primary whitespace-no-wrap">
                            {post.categories.length > 0 ? post.categories[0] : 'No category'}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-primary whitespace-no-wrap">
                            {formatDate(post.createdAt)}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          {post.tags.length > 0
                            ? post.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="relative inline-block px-3 py-1 text-sm leading-tight text-background2 m-0.5"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-primary rounded-full"
                                  ></span>
                                  <span className="relative">{tag}</span>
                                </span>
                              ))
                            : 'No tags'}
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='text-3xl m-auto text-center'>No Post found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
                >
                  1
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                >
                  2
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
                >
                  3
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                >
                  4
                </button>
                <button
                  type="button"
                  className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePost;
