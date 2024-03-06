import { images } from '@constants/images';
import pathToUploadPicture from '@constants/pathToUploadPicture';
import { Post } from '@customTypes/Types';
import { paths } from '@routes/paths';
import { useNavigate } from 'react-router-dom';

type Props = {
  classname: string;
  header: string;
  data: Post[];
  tags: string[];
};

const SuggestedArticles = ({ classname, header, data, tags }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-4 md:max-w-[600px] md:flex md:gap-14 md:mx-auto md:items-start lg:block lg:max-w-[300px] ${classname}`}
    >
      <div>
        <h2 className="font-medium text-primary md:text-xl">{header}</h2>
        <div className="grid gap-y-5 mt-5 md:gap-x-5 lg:grid-cols-1">
          {data?.slice(0, 5).map((item) => (
            <div key={item._id} className="flex space-x-3 flex-nowrap items-center">
              <img
                src={
                  item?.photo
                    ? pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + item.photo
                    : images.noPostImage
                }
                alt={item.title}
                className="aspect-square object-cover rounded-lg w-1/5"
              />
              <div
                onClick={() => navigate(`${paths.readArticle}/${item.slug}`)}
                className="text-sm text-primary2 font-medium hover:cursor-pointer"
              >
                <h3 className="text-sm text-primary2 fomt-medium md:text-base lg:text-sm">
                  {item.title}
                </h3>
                <span className="text-xs opacity-60">
                  {new Date(item.createdAt).toDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-medium text-primary2 mt-8 md:text-xl">Tags</h2>
        {tags.length !== 0 ? (
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="inline-block rounded-md px-3 py-1.5 bg-primary2 text-background2 text-xs md:text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">No Tags for this post</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedArticles;
