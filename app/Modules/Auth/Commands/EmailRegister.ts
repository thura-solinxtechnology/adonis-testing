import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import RegisterData from '../Data/RegisterData'
import CreateOtp from './CreateOtp'

class EmailRegister {
  public async handle(data: RegisterData) {
    const user = await User.create(await data.getData())

    const otp = await CreateOtp.handle(user)

    await new VerifyEmail(user, otp).sendLater()
  }
}

export default new EmailRegister()
