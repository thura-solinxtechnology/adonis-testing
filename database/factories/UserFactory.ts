import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'
import LoginTypes from 'App/Modules/Common/Enums/LoginTypes'

export default Factory.define(User, async ({ faker }) => {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
    phone: faker.phone.number(),
    loginType: LoginTypes.Email,
    loginId: faker.string.alphanumeric(16),
    firebaseToken: faker.string.alphanumeric(25),
    profileImage: undefined,
  }
}).build()
