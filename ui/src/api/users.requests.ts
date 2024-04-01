import client from './client';

export interface LoginUserPayload {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  accessToken: string;
}

export const loginUser = async (
  payload: LoginUserPayload,
): Promise<LoginUserResponse> => {
  const response = await client.post<LoginUserResponse>('/auth/login', payload);
  return response.data;
};

export interface ProfileResponse {
  id: string;
  username: string;
  isAdmin: boolean;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await client.get('/users/profile');
  return response.data;
};

export interface RegisterUserPayload {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface RegisterResponse extends ProfileResponse {
  accessToken: string;
}

export const registerUser = async (
  payload: RegisterUserPayload,
): Promise<RegisterResponse> => {
  const response = await client.post<RegisterResponse>(
    '/users/register',
    payload,
  );
  return response.data;
};
