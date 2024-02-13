import { SocialMediaType } from '@customTypes/Types';
import React from 'react'
import { FaFacebookF, FaRedditSquare, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


const SocialButtons = ({url, title}: SocialMediaType) => {
  return (
    <div className="w-ful flex justify-start gap-x-5">
      <a
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer"
        href={`https://www.facebook.com/dialog/share?app_id=379143851505637&display=popup&href=${url}`}
      >
        <FaFacebookF className="text-[#3b5998] w-8 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" className="cursor-pointer" href={`https://twitter.com/intent/tweet?url=${url}`}>
        <FaXTwitter className="text-black w-8 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" className="cursor-pointer" href={`https://www.reddit.com/submit?url=${url}&title=${title}`}>
        <FaRedditSquare className="text-red-500 w-8 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" className="cursor-pointer" href={`https://api.whatsapp.com/send/?text=${url}`}>
        <FaWhatsapp className="text-green-500 w-8 h-auto" />
      </a>
    </div>
  );
}

export default SocialButtons;
