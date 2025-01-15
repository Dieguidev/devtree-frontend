import { isAxiosError } from 'axios';
import { api } from '../config/axios';
import { User } from '../types';

export async function getUser() {
  try {
    const { data } = await api.get<User>('/api/user', );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
