export type LoggedInUser = {
  id: string;
  avatar: string;
  admin: boolean;
  email: string;
  name: string;
  verified: boolean;
}

export interface NavLink {
  name: string;
  path: string;
  icon?: boolean;
  condition?: boolean;
  dropdown?: NavLink[];
}


export type AffectedCommentType = {
  type: string;
  _id: number | string;
};

export type SocialMediaType = {
  url: string;
  title: string;
}

interface CustomHeaders {
  'x-filter'?: string;
  'x-totalCount'?: string;
  'x-currentpage'?: string;
  'x-pagesize'?: string;
  'x-totalpagecount'?: string;
}

export interface Post {
  _id: string;
  title: string;
  caption: string;
  slug: string;
  body: {
    type: string;
    content: any[];
  };
  photo: string;
  user: {
    _id: string;
    avatar: string;
    name: string;
    verified: boolean;
    admin?: boolean;
  };
  tags: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AllPost {
  data: Post[];
  headers: CustomHeaders;
}

export interface Replies {
  _id: string ;
  user: {
    _id: string;
    avatar: string;
    name: string;
  };
  desc: string;
  post: string;
  check: boolean;
  parent: string | undefined;
  replyOnUser: string | undefined;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Comments extends Replies {
  replies?: Replies[];
}

type NavContent = {
  title: string;
  link: string;
  icon: JSX.Element;
  id: string;
}

export type MenuItem = {
  title: string;
  link: string;
  icon: JSX.Element;
  id: string;
  type: 'link' | 'collapse';
  content?: NavContent[];
};
