export type IPost = {
  _id: string;
  text: string;
  author: string;
  name: string;
  likes: number;
  image: string;
  createdAt: Date;
};

export type IUser = {
  _id: string;
  attendingEvents: Array<any>;
  email: string;
  hostEvents: Array<any>;
  name: string;
  password: string;
  pets: Array<any>;
  posts: Array<any>;
  likedPosts: Array<any>;
  rol: string;
  token: string;
};
