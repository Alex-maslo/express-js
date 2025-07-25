export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

export interface ICreateUserDto {
  name: string;
  age: number;
  email: string;
  password: string;
}
