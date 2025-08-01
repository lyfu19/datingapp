import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { LoginRequest, RegisterRequest, User } from '../shared/types';

export const login = async (creds: LoginRequest) => {
  const response = await axios.post<User>(`${API_BASE_URL}account/login`, creds);
  return response.data;
};

export const register = async (creds: RegisterRequest) => {
  const response = await axios.post<User>(`${API_BASE_URL}account/register`, creds);
  return response.data;
};
