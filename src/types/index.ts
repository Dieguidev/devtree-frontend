export type User = {
  name: string;
  email: string;
  handle: string;
  id: string;
  description: string;
  image: string;
};

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
  password: string;
  passwordConfirmation: string;
};

export type LoginForm = Pick<User, 'email'> &{
  password: string;
}

export type ProfileForm = Pick<User, 'handle' | 'description'>;
