export interface User {
  _id?: string;
  username?: string;
  email?: string;
  name?: string;
  dateOfBirth?: Date;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}
