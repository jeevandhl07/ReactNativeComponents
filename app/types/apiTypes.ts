export interface BasicResponse {
  Code: number;
  Message: string;
}
export interface ILoginRequest {
  mobileNumber: string;
  otpCode: string;
  deviceId: string;
  deviceOs: string;
}
export interface IRequestOtpRequest {
  mobileNumber: string;
}
export interface IRefreshResponse {
  AccessToken: string;
  RefreshToken: string;
  Expiration: number;
}
export interface IRequestOtpResponse extends BasicResponse {
  Data?: {
    mobileNumber: string;
    expiresInSeconds: number;
    canResendAfterSeconds: number;
  };
}
export interface IVerifyOtpData {
  AccessToken: string;
  RefreshToken: string;
  roles: string[];
  isVerified: boolean;
}
export interface IUserLoginResponse extends BasicResponse {
  Data?: IVerifyOtpData;
}
export interface IUserDecode {
  exp: number | null;
  rfrs: string | null;
  authToken: string | null;
  Email: string | null;
  FirstName: string | null;
  LastName: string | null;
  Role: string | null;
  IsKycVerified: boolean;
  IsApproved: boolean;
  IsKycCreated: boolean;
  IsRejected: boolean;
  AgreementDocument?: string | null;
  RejectedReason: string | null;
  AppUserId?: number;
  IdentityUserId?: number | null;
  UserName?: string | null;
  Address?: string | null;
  PhoneNumber?: string | null;
  DOB?: string | null;
  ProfilePicture?: string | null;
  Gender?: string | null;
  IsActive?: boolean;
  IsFromGoogle?: boolean;
  isLoggedIn?: boolean;
  isLoading?: boolean;
}
//#region Dropdown
export interface IStateDistrictList extends BasicResponse {
  Data: {
    state: {
      StateId: number;
      Name: string;
      ShortName: string;
      CountryId: number;
    }[];
    district: {
      DistrictId: number;
      Name: string;
      StateId: number;
    }[];
  };
}
export interface ICityList extends BasicResponse {
  Data: {
    Id: number;
    DistrictId: number;
    Name: string;
  }[];
}
export interface IBankList extends BasicResponse {
  Data: {
    BankId: number;
    Name: string;
    BankCode: string;
  }[];
}
