type LoginReqBody = {
  email: string;
  password: string;
};

type LoginResBody = {
  token: string;
};

type RegisterReqBody = LoginReqBody & {
  name: string;
};

type RegisterResBody = LoginResBody & {
  id: string;
};
