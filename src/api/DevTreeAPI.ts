import { isAxiosError } from 'axios';
import { api } from '../config/axios';
import {  User } from '../types';

export async function getUser() {
  try {
    const { data } = await api.get<User>('/api/user');
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function updateProfile(formData: User) {
  console.log(formData);

  try {
    const { data } = await api.put<string>('/api/user', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.error);

      throw new Error(error.response?.data.error);
    }
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const { data } = await api.post('/api/user/upload-image', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.error);

      throw new Error(error.response?.data.error);
    }
  }
}
