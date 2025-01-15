export type User = {
  name: string;
  email: string;
  handle: string;
  id: string;
};

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
  password: string;
  passwordConfirmation: string;
};

export type LoginForm = Pick<User, 'email'> &{
  password: string;
}
