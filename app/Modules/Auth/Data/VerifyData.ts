interface VerifyDataInterface {
  email: string
  code: string
}

export default class VerifyData {
  private constructor(
    public email: string,
    public code: string
  ) {}

  public static of({ email, code }: VerifyDataInterface): VerifyData {
    if (!email || !code) {
      throw new Error('Invalid register data')
    }

    return new VerifyData(email, code)
  }

  public async getData() {
    return {
      email: this.email,
      code: this.code,
    }
  }
}
