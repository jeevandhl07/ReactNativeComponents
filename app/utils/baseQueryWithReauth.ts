import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { SERVER } from '../constants/config';
import { IRefreshResponse, IUserDecode } from '../types/apiTypes';
import { clearUser, setUser } from '../redux/reducer/userReducer';
import { userAPI } from '../redux/api/userAPI';
import { ThunkDispatch } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from './getAccessToken';

const SESSION_EXPIRED_ERROR = {
  status: 401,
  data: { Message: 'Session expired. Please login again.' },
} as FetchBaseQueryError;

const refreshTokenHandler = async (
  clientToken: string,
  rfrs: string | null,
  user: IUserDecode,
  dispatch: ThunkDispatch<any, any, any>,
): Promise<string | null> => {
  try {
    const response = await fetch(`${SERVER}/api/refresh-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${clientToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ RefreshToken: rfrs }),
    });

    if (response.ok) {
      const result: IRefreshResponse = await response.json();
      const decoded = jwtDecode<{ exp?: number }>(result.AccessToken);
      const updatedUser: IUserDecode = {
        ...user,
        exp: result.Expiration ?? decoded.exp ?? null,
        authToken: result.AccessToken,
        rfrs: result.RefreshToken,
      };

      dispatch(setUser(updatedUser));

      return result.AccessToken;
    } else {
      dispatch(clearUser());
      dispatch(userAPI.util.resetApiState());
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    dispatch(clearUser());
    dispatch(userAPI.util.resetApiState());
  }
  return null;
};

const getClientToken = async (
  api: Parameters<typeof getAccessToken>[1],
  extraOptions: Parameters<typeof getAccessToken>[2],
) => {
  const tokenBaseQuery = fetchBaseQuery({ baseUrl: SERVER });
  return getAccessToken(tokenBaseQuery, api, extraOptions);
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { baseUrl?: string }
> = async (args, api, extraOptions) => {
  const dispatch = api.dispatch;

  const baseUrl = extraOptions?.baseUrl || `${SERVER}/api`;
  const state = api.getState() as RootState;
  const user = state.user;
  const currentTime = Math.floor(Date.now() / 1000);
  const baseQuery = fetchBaseQuery({ baseUrl });

  const fetchArgs: FetchArgs =
    typeof args === 'string' ? { url: args } : { ...args };
  const isClientTokenRequest = fetchArgs.url === '/connect/token';

  const headers: Record<string, string> = fetchArgs.headers
    ? fetchArgs.headers instanceof Headers
      ? Object.fromEntries(fetchArgs.headers.entries())
      : Array.isArray(fetchArgs.headers)
      ? Object.fromEntries(fetchArgs.headers)
      : fetchArgs.headers
    : {};

  if (user?.authToken) {
    const { authToken, exp, rfrs } = user;

    if (exp && currentTime > exp) {
      if (!rfrs) {
        dispatch(clearUser());
        dispatch(userAPI.util.resetApiState());
        return { error: SESSION_EXPIRED_ERROR };
      }

      let clientToken: string | null = null;

      try {
        clientToken = await getClientToken(api, extraOptions);
      } catch (error) {
        console.error('Failed to get client token:', error);
      }

      if (!clientToken) {
        dispatch(clearUser());
        dispatch(userAPI.util.resetApiState());
        return { error: SESSION_EXPIRED_ERROR };
      }

      const token = await refreshTokenHandler(
        clientToken,
        rfrs,
        user,
        dispatch,
      );

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        return { error: SESSION_EXPIRED_ERROR };
      }
    } else {
      headers.Authorization = `Bearer ${authToken}`;
    }
  } else if (!isClientTokenRequest) {
    try {
      const clientToken = await getClientToken(api, extraOptions);
      headers.Authorization = `Bearer ${clientToken}`;
    } catch (error) {
      console.error('Failed to get client token:', error);
    }
  }

  fetchArgs.headers = headers;
  let result = await baseQuery(fetchArgs, api, extraOptions);

  if (
    result.error?.status === 401 &&
    user?.authToken &&
    user?.rfrs &&
    headers.Authorization === `Bearer ${user.authToken}`
  ) {
    let clientToken: string | null = null;

    try {
      clientToken = await getClientToken(api, extraOptions);
    } catch (error) {
      console.error('Failed to get client token:', error);
    }

    if (!clientToken) {
      dispatch(clearUser());
      dispatch(userAPI.util.resetApiState());
      return { error: SESSION_EXPIRED_ERROR };
    }

    const token = await refreshTokenHandler(
      clientToken,
      user.rfrs,
      user,
      dispatch,
    );

    if (token) {
      fetchArgs.headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      result = await baseQuery(fetchArgs, api, extraOptions);
    } else {
      return { error: SESSION_EXPIRED_ERROR };
    }
  }

  return result;
};
