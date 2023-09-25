export interface User {
  _id?: string;
  userId?: string;
  username?: string;
  email?: string;
  name?: string;
  dateOfBirth?: Date;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
}
