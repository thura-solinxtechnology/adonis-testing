import { Exception } from '@adonisjs/core/build/standalone'
import Hash from '@ioc:Adonis/Core/Hash'
import { Status } from 'App/Http/Responses/Status'
import User from 'App/Models/User'
import UserCredential from '../Data/UserCredential'
import FetchRegisteredUserByEmail from '../Queries/FetchRegisteredUserByEmail'

class UserLogin {
  public async handle(data: UserCredential): Promise<User> {
    const user = await FetchRegisteredUserByEmail.handle(data.email)

    const checkPassword = await Hash.verify(user!.password!, data.password)
    if (!checkPassword) {
      throw new Exception('Login Failed!', Status.UNAUTHORIZED)
    }

    return user!
  }
}

export default new UserLogin()
