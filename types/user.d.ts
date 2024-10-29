type UserData = {
  id: string;
  name?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  authorization?: UserAuthorization;
};

type UserAuthorization = {
  token: string;
};

type User = {
  isLoggedIn: boolean;
  data: UserData | null;
};
