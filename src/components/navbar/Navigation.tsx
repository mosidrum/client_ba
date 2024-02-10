import { NavLink } from '@customTypes/Types'
import { paths } from '@routes/paths';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  Links: NavLink[];
}

const Navigation = ({Links}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap mx-auto pb-2">
      {Links.map((link, index) => (
        <div
          key={index}
          className="mr-2 hover:cursor-pointer"
          onClick={() => navigate(paths[link.path])}
        >
          {link.name}
        </div>
      ))}
    </div>
  );
}

export default Navigation