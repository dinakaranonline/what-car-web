import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
  {
    userName: "dks",
    bearerToken: "abi393kdkd9393ikd",
    isAuthenticated: true,
    canAccessCars: true,
    canAddCars: true,
    canSaveCars: true

  },
  {
    userName: "asin",
    bearerToken: "sd9f923k3kdmcjkhd",
    isAuthenticated: true,
    canAccessCars: true,
    canAddCars: false,
    canSaveCars: false
  }
];
