import React from 'react';
import { FaBlog, FaDotCircle } from 'react-icons/fa';

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-primary2 text-background2 px-5 pb-5 overflow-x-hidden bottom-0">
      <div className="md:flex justify-evenly items-center pt-20 gap-14">
        <div className="hidden md:flex md:flex-col md:gap-2">
          <FaBlog className="w-10 h-10" />
          <p>Read amazing and facinating blogs from our users.</p>
          <div className="flex text-background2 gap-2">
            <FaDotCircle />
            <FaDotCircle />
            <FaDotCircle />
            <FaDotCircle />
          </div>
        </div>
        <div className="flex justify-evenly md:gap-10 sm:gap-5">
          <div className="flex flex-col gap-10 md:flex-row md:gap-10 sm:gap-5">
            <div>
              <div className="font-bold mb-5">Product</div>
              <div className="flex flex-col gap-2">
                <p>Landing page</p>
                <p>Features</p>
                <p>Documentation</p>
                <p>Referal Programs</p>
                <p>Pricing</p>
              </div>
            </div>
            <div>
              <div className="font-bold mb-5">Services</div>
              <div className="flex flex-col gap-2">
                <p>Documentation</p>
                <p>Design</p>
                <p>Themes</p>
                <p>Illustrations</p>
                <p>UI kit</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:flex-row  md:gap-10 sm:gap-5">
            <div>
              <div className="font-bold mb-3">Company</div>
              <div className="flex flex-col gap-2">
                <p>About</p>
                <p>Terms</p>
                <p>Private Policy</p>
                <p>Careers</p>
              </div>
            </div>
            <div>
              <div className="font-bold mb-3">More</div>
              <div className="flex flex-col gap-2">
                <p>Documentation</p>
                <p>License</p>
                <p>Changelog</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-background2 mt-20 flex justify-center">
        Copyright &copy; {new Date().getFullYear()} Ayodele Isaac{' '}
      </div>
    </div>
  );
};

export default Footer;
