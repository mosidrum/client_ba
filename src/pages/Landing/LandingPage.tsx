import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { Outlet } from 'react-router-dom';

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LandingPage;
