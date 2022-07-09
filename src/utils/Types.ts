export type IPost = {
  _id: string;
  text: string;
  author: string;
  name: string;
  likes: number;
  image: string;
  createdAt: Date;
  comments: IComment[];
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

export type IEvent = {
  _id: string;
  host: IUser;
  attendants: IUser[];
  price: number;
  date: Date;
  place: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export type IComment = {
  _id: string;
  author: string;
  authorName: string;
  comment: string;
  createdAt: string;
};
