import User from 'App/Models/User'
import LoginTypes from 'App/Modules/Common/Enums/LoginTypes'

class FetchRegisteredUserByEmail {
  public async handle(email: string) {
    return User.query().where('email', email).where('login_type', LoginTypes.Email).first()
  }
}

export default new FetchRegisteredUserByEmail()
