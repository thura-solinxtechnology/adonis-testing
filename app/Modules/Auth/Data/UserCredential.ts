interface UserCredentialInterface {
  email: string
  password: string
}

export default class UserCredential {
  private constructor(
    public email: string,
    public password: string
  ) {}

  public static of({ email, password }: UserCredentialInterface): UserCredential {
    if (!email || !password) {
      throw new Error('Invalid register data')
    }

    return new UserCredential(email, password)
  }

  public async getData() {
    return {
      email: this.email,
      password: this.password,
    }
  }
}
