import { Exception } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import VerifyData from '../Data/VerifyData'
import FetchLatestUserOtp from '../Queries/FetchLatestUserOtp'
import FetchRegisteredUserByEmail from '../Queries/FetchRegisteredUserByEmail'

class VerifyEmail {
  public async handle(data: VerifyData) {
    const user = await FetchRegisteredUserByEmail.handle(data.email)

    this.checkAlreadyRegister(user)

    await this.checkOtpCode(user!, data.code)

    await user!.merge({ emailVerifiedAt: DateTime.now() }).save()
  }

  private async checkOtpCode(user: User, otpCode: string) {
    const otp = await FetchLatestUserOtp.handle(user.id)

    if (!otp) {
      throw new Exception('This OTP is not found!')
    }

    if (otp.code !== otpCode) {
      throw new Exception('This OTP code is invalid')
    }

    if (otp?.expiredAt! < DateTime.now()) {
      throw new Exception('This OTP code is expired')
    }
  }

  private checkAlreadyRegister(user: User | null) {
    if (!user) {
      throw new Exception('This email is not registered. Therefore, you should register first.')
    }
  }
}

export default new VerifyEmail()
