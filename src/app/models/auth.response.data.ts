export interface AuthResponseData {
  idToken: string;
  name: string,
  firstName: string,
  lastName: string,
  email: string;
  refreshToken: string;
  expiresIn?: string;
  localId: string;
  registered?: boolean;
}
