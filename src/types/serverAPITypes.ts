interface IMovie {
  _id: string;
  title: string;
  description?: string;
  creationDate: string;
  genre: string;
  image?: string;
  budget: number;
  actors?: IActor[];
  directors?: IDirector[];
}

interface IActor {
  _id: string;
  name: string;
  surname: string;
  description?: string;
  height?: string;
  birthday: string;
  dateOfDeath?: null;
  image?: string;
  placeOfBirth: string;
  movies?: IMovie[];
}

interface IDirector {
  _id: string;
  name: string;
  surname: string;
  description?: string;
  birthday: string;
  dateOfDeath?: null;
  image?: string;
  placeOfBirth: string;
  movies?: IMovie[];
}

interface IMoviesResponse {
  data: IMovie[];
  pagination: IPagination;
}

interface IActorsResponse {
  data: IActor[];
  pagination: IPagination;
}

interface IDirectorsResponse {
  data: IDirector[];
  pagination: IPagination;
}

interface IPagination {
  total: number;
  limit: number;
  total_pages: number;
  current_page: number;
}

interface ISearch {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  movies: Array<{ _id: string }>;
  actors: Array<{ _id: string }>;
  directors: Array<{ _id: string }>;
}

interface ICreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface IUpdateUserDto extends Partial<ICreateUserDto> {
  oldPassword?: string;
}

interface ILoginUserDto {
  email: string;
  password: string;
}

interface IAuthUserResponse {
  user: IUser;
  token: string;
}

interface ICheckUserResponse {
  isAuthorized: boolean;
  user: IUser | undefined;
}

interface IErrorResponse {
  status: number;
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

export type {
  IActor,
  IActorsResponse,
  IAuthUserResponse,
  ICheckUserResponse,
  ICreateUserDto,
  IDirector,
  IDirectorsResponse,
  IErrorResponse,
  ILoginUserDto,
  IMovie,
  IMoviesResponse,
  IPagination,
  ISearch,
  IUpdateUserDto,
  IUser,
};
