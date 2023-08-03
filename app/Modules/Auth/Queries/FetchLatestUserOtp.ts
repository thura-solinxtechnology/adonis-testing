import Database from '@ioc:Adonis/Lucid/Database'
import Otp from 'App/Models/Otp'

class FetchLatestUserOtp {
  public async handle(userId: string) {
    return Database.modelQuery<typeof Otp, Otp>(Otp)
      .where('user_id', userId)
      .orderByRaw('created_at desc')
      .first()
  }
}

export default new FetchLatestUserOtp()
