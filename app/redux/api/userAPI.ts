import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import { SERVER } from '../../constants/config';
import {
  ILoginRequest,
  IRequestOtpRequest,
  IRequestOtpResponse,
  IUserLoginResponse,
} from '../../types/apiTypes';

const publicBaseQuery = fetchBaseQuery({ baseUrl: SERVER });

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: async (args, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions, baseUrl: `${SERVER}` }),
  tagTypes: ['user'],
  endpoints: builder => ({
    requestOtp: builder.mutation<IRequestOtpResponse, IRequestOtpRequest>({
      queryFn: async (payload, api, extraOptions) => {
        const otpResponse = await publicBaseQuery(
          {
            url: '/api/auth/request-otp',
            method: 'POST',
            body: payload,
          },
          api,
          extraOptions,
        );

        if (otpResponse.error) {
          return { error: otpResponse.error as FetchBaseQueryError };
        }

        return { data: otpResponse.data as IRequestOtpResponse };
      },
    }),
    login: builder.mutation<IUserLoginResponse, ILoginRequest>({
      async queryFn(payload, api, extraOptions) {
        try {
          const userResponse = await publicBaseQuery(
            {
              url: '/api/auth/verify-otp',
              method: 'POST',
              body: payload,
            },
            api,
            extraOptions,
          );

          if (userResponse.error) {
            return { error: userResponse.error as FetchBaseQueryError };
          }

          const data = userResponse.data as IUserLoginResponse;

          return { data };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              error: (error as Error).message,
            } as FetchBaseQueryError,
          };
        }
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useRequestOtpMutation, useLoginMutation } = userAPI;
