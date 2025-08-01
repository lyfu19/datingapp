export interface User {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string | null;
  token: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  displayName: string;
  password: string;
};
