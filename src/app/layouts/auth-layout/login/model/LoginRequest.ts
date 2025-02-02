
export class LoginRequest {
  username: string ='';
  password: string = '';

  public constructor(init?: Partial<LoginRequest>) {
    Object.assign(this, init);
  }
}
