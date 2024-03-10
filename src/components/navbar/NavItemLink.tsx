import { MenuItem } from '@customTypes/Types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = Omit<MenuItem, 'type'> & {
  largeScreen: boolean | number | null;
  activeNavId: string;
  setActiveNavId: React.Dispatch<React.SetStateAction<string>>;
  isMenuClicked: boolean;
  setIsMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavItemLink = ({
  link,
  title,
  icon,
  id,
  setActiveNavId,
  activeNavId,
  setIsMenuClicked,
  isMenuClicked,
    largeScreen
}: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(link); setActiveNavId(id); largeScreen ? setIsMenuClicked(true) : setIsMenuClicked(!isMenuClicked);
      }}
      className={`${id === activeNavId ? 'font-bold text-primary bg-background2' : 'font-semibold text-background2'} flex items-center mb-2 gap-x-2 py-2 px-2 border rounded-md text-lg cursor-pointer`}
    >
      {icon}
      {title}
    </div>
  );
};

export default NavItemLink;
