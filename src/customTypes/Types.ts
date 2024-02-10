export interface NavLink {
  name: string;
  path: string;
  icon?: boolean;
  dropdown?: NavLink[];
}

export interface Post {
  _id: number | string;
  title: string;
  tag: string;
  image: string;
  createdAt: string;
}

export interface User extends Post {
  id: number | string;
  name: string;
  verified: boolean;
}

export type suggestedArticle = Omit<Post, 'tag'>;
