interface RegisterDataInterface {
  name: string
  email: string
  password: string
}

export default class RegisterData {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  public static of({ name, email, password }: RegisterDataInterface): RegisterData {
    if (!name || !email || !password) {
      throw new Error('Invalid register data')
    }

    return new RegisterData(name, email, password)
  }

  public async getData() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    }
  }
}
