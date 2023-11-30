export interface UserType {
  _id?: string;
  email: string;
  username: string;
  password: string;
  fullname: string;
  avatar: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface RegisterType {
  email: string;
  username: string;
  password: string;
  fullname: string;
}
