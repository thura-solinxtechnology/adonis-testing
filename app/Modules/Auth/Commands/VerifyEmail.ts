import { Exception } from '@adonisjs/core/build/standalone'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { DateTime } from 'luxon'
import VerifyData from '../Data/VerifyData'
import FetchLatestUserOtp from '../Queries/FetchLatestUserOtp'
import FetchRegisteredUserByEmail from '../Queries/FetchRegisteredUserByEmail'

class VerifyEmail {
  public async handle(data: VerifyData, auth: AuthContract) {
    const user = await FetchRegisteredUserByEmail.handle(data.email)

    if (!user) {
      throw new Exception('This email is not registered')
    }

    const otp = await FetchLatestUserOtp.handle(user.id)

    if (!otp) {
      throw new Exception('This OTP is not found!')
    }

    if (otp.code !== data.code) {
      throw new Exception('This OTP code is invalid')
    }

    if (otp?.expiredAt! < DateTime.now()) {
      throw new Exception('This OTP code is expired')
    }

    return auth.use('api').generate(user)
  }
}

export default new VerifyEmail()
