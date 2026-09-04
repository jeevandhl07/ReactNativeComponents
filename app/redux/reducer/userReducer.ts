import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUserDecode } from '../../types/apiTypes';

const initialState: IUserDecode = {
  authToken: null,
  rfrs: null,
  Email: null,
  FirstName: null,
  LastName: null,
  Role: null,
  exp: null,
  IsKycVerified: false,
  IsApproved: false,
  IsKycCreated: false,
  IsRejected: false,
  AgreementDocument: null,
  RejectedReason: null,
  IdentityUserId: null,
  isLoggedIn: false,
  isLoading: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserDecode>) => {
      const {
        exp,
        rfrs,
        authToken,
        Email,
        FirstName,
        LastName,
        Role,
        IsKycVerified,
        IsApproved,
        IsKycCreated,
        IsRejected,
        AgreementDocument,
        RejectedReason,
        IdentityUserId,
      } = action.payload;

      return {
        ...initialState,
        exp,
        rfrs,
        authToken,
        Email,
        FirstName,
        LastName,
        Role,
        IsKycVerified,
        IsApproved,
        IsKycCreated,
        IsRejected,
        AgreementDocument,
        RejectedReason,
        IdentityUserId,
        isLoggedIn: true,
        isLoading: false,
      };
    },
    clearUser: state => {
      state.authToken = null;
      state.rfrs = null;
      state.Email = null;
      state.FirstName = null;
      state.LastName = null;
      state.Role = null;
      state.exp = null;
      state.IsKycVerified = false;
      state.IsApproved = false;
      state.IsKycCreated = false;
      state.IsRejected = false;
      state.AgreementDocument = null;
      state.RejectedReason = null;
      state.IdentityUserId = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setKycStatus: (
      state,
      action: PayloadAction<
        Pick<
          IUserDecode,
          | 'IsKycVerified'
          | 'IsApproved'
          | 'IsKycCreated'
          | 'IsRejected'
          | 'AgreementDocument'
          | 'RejectedReason'
        >
      >,
    ) => {
      state.IsKycVerified = action.payload.IsKycVerified;
      state.IsApproved = action.payload.IsApproved;
      state.IsKycCreated = action.payload.IsKycCreated;
      state.IsRejected = action.payload.IsRejected;
      state.AgreementDocument = action.payload.AgreementDocument;
      state.RejectedReason = action.payload.RejectedReason;
    },
  },
});

export const { setUser, clearUser, setLoading, setKycStatus } =
  userReducer.actions;

export const selectUserInfo = createSelector(
  (state: RootState) => state.user,
  user => ({
    authToken: user.authToken,
    rfrs: user.rfrs,
    Email: user.Email,
    FirstName: user.FirstName,
    LastName: user.LastName,
    Role: user.Role,
    exp: user.exp,
    IsKycVerified: user.IsKycVerified,
    IsApproved: user.IsApproved,
    IsKycCreated: user.IsKycCreated,
    IsRejected: user.IsRejected,
    AgreementDocument: user.AgreementDocument,
    RejectedReason: user.RejectedReason,
    IdentityUserId: user.IdentityUserId,
    isLoggedIn: user.isLoggedIn,
    isLoading: user.isLoading,
  }),
);

export default userReducer.reducer;
