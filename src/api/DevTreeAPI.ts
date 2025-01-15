import { isAxiosError } from 'axios';
import { api } from '../config/axios';

export async function getUser() {
  try {
    const { data } = await api.get('/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
