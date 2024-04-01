import { Article } from '../types';
import client from './client';

export interface ArticlesResponse {
  totalCount: number;
  list: Article[];
}

export const getArticles = async (
  page: number,
  limit: number,
  search: string,
  sort: string,
): Promise<ArticlesResponse> => {
  const response = await client.get<ArticlesResponse>(
    `/articles?page=${page}&limit=${limit}&search=${search}&sort=${sort}`,
  );
  return response.data;
};

export const createArticle = async (
  payload: Article,
): Promise<ArticlesResponse> => {
  const response = await client.post<ArticlesResponse>('/articles', payload);
  return response.data;
};

export const updateArticle = async (payload: {
  data: Article;
  id: string;
}): Promise<ArticlesResponse> => {
  const response = await client.put<ArticlesResponse>(
    `/articles/${payload.id}`,
    payload.data,
  );
  return response.data;
};

export const deleteArticle = async (id: string): Promise<ArticlesResponse> => {
  const response = await client.delete<ArticlesResponse>(`/articles/${id}`);
  return response.data;
};
