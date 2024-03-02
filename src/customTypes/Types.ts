export interface NavLink {
  name: string;
  path: string;
  icon?: boolean;
  dropdown?: NavLink[];
}

export interface User extends Post {
  id: string;
  name: string;
  verified: boolean;
}

export type CommentType = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  desc: string;
  post: string;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
};

export type AffectedCommentType = {
  type: string;
  _id: number | string;
};

export type SocialMediaType = {
  url: string;
  title: string;
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
  };
  tags: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Comments {
  _id: string;
  user: {
    _id: string;
    avatar: string;
    name: string;
  };
  desc: string;
  post: string;
  check: boolean;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  replies?: Comment[];
  id: string;
}