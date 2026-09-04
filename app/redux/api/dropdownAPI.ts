import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import { IStateDistrictList, IBankList, ICityList } from '../../types/apiTypes';

export const dropdownAPI = createApi({
  reducerPath: 'dropdownApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getStateDistrict: builder.query<IStateDistrictList, string>({
      query: () => '/state-district-list',
    }),
    getCity: builder.query<ICityList, string>({
      query: districtId => `/city-list/${districtId}`,
    }),
    getBank: builder.query<IBankList, string>({
      query: () => '/bank-list',
    }),
  }),
});

export const { useGetStateDistrictQuery, useGetCityQuery, useGetBankQuery } =
  dropdownAPI;
