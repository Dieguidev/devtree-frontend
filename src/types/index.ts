export type User = {
  name: string;
  email: string;
  handle: string;
  id: string;
  description: string;
  image: string;
  links: Array<{ name: string, url: string, enable: boolean }> | []
};

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
  password: string;
  passwordConfirmation: string;
};

export type LoginForm = Pick<User, 'email'> &{
  password: string;
}

export type ProfileForm = Pick<User, 'handle' | 'description'>;

export type SocialNetwork = {
  id: number
  name: string;
  url: string;
  enable: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enable'>;
