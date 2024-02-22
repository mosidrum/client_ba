import { paths } from '@routes/paths';
import { capFirstLetter } from '@utils/functions';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type Props = {
  type: string;
  message: string;
  name?: string;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalPopup = ({ type, message, name, setShowAlert }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${
        type === 'success' ? ' border-green-500 text-green-500' : ' border-red-500'
      }w-full h-44 border rounded-lg relative flex flex-col items-center justify-between p-4`}
    >
      <div>
        <MdOutlineClose
          size={20}
          className="absolute top-4 right-4 hover:cursor-pointer"
          onClick={() => {
            setShowAlert(false);
            if (name !== undefined) {
              navigate(paths[name]);
            }
          }}
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{message} 🎉</h1>
      {name && (
        <p className="text-center">
          Click here to{' '}
          <span
            className="hover:cursor-pointer font-medium underline"
            onClick={() => navigate(paths[name])}
          >
            {capFirstLetter(name)}
          </span>
        </p>
      )}
    </div>
  );
};

export default GlobalPopup;
