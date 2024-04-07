export type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type TrackingCoinForm = {
  id?: string;
  digitalAsset: string;
  market: string;
  detail: string;
  img?: string | null;
  quantity: number;
  price: number;
  soldAt?: Date | null;
};
