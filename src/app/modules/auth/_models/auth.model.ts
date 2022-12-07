export class AuthModel {
  token: string | undefined;;
  refreshToken: string | undefined;
  expiresIn: Date | undefined;

  setAuth(auth: any) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}
