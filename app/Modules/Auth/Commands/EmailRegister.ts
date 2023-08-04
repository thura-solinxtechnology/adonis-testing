import { Exception } from '@adonisjs/core/build/standalone'
import { Status } from 'App/Http/Responses/Status'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import RegisterData from '../Data/RegisterData'
import FetchRegisteredUserByEmail from '../Queries/FetchRegisteredUserByEmail'
import CreateOtp from './CreateOtp'

class EmailRegister {
  public async handle(data: RegisterData) {
    const registeredUser = await FetchRegisteredUserByEmail.handle(data.email)

    if (registeredUser && registeredUser.emailVerifiedAt) {
      throw new Exception('This email have already been taken!', Status.UNPROCESSABLE_CONTENT)
    }

    if (registeredUser && !registeredUser.emailVerifiedAt) {
      throw new Exception('This email has already not been verified yet!', Status.NOT_ACCEPTABLE)
    }

    const user = await User.create(await data.getData())

    const otp = await CreateOtp.handle(user)

    await new VerifyEmail(user, otp).sendLater()
  }
}

export default new EmailRegister()
