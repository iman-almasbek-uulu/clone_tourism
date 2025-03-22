import { api as index } from "..";
import { MY_REVIEWS } from "./types";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getMeReviews: builder.query<MY_REVIEWS.Responses.GetReviews, void>({
      query: () => ({
        url: `/user_comments/`,
        method: 'GET',
      }),
      // Трансформируем ответ, чтобы привести его к нужному формату
      transformResponse: (response: any) => {
        // Если сервер возвращает массив отзывов напрямую
        return { data: response };
      },
      providesTags: ['comments2', 'Reviews2'],
    }),
  }),
});

export const { useGetMeReviewsQuery } = api;