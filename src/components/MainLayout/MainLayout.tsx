import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <div className="md:px-10 pt-24">{children}</div>;
};

export default MainLayout;
