import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { Outlet } from 'react-router-dom';

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPage;
