import type {
  BaseQueryFn,
  FetchBaseQueryError,
  BaseQueryApi,
} from '@reduxjs/toolkit/query';

export const getAccessToken = async (
  baseQuery: BaseQueryFn<any, unknown, FetchBaseQueryError>,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const formBody = new URLSearchParams();
  formBody.append('client_id', 'spareparts_client_token');
  formBody.append('client_secret', 'spareparts_client_secret');
  formBody.append('grant_type', 'client_credentials');

  const tokenResponse = await baseQuery(
    {
      url: '/connect/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    },
    api,
    extraOptions,
  );

  if (tokenResponse.error) {
    throw tokenResponse.error;
  }

  const { access_token } = tokenResponse.data as { access_token: string };

  return access_token;
};
