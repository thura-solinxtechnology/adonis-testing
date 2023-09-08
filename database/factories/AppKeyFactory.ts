import Factory from '@ioc:Adonis/Lucid/Factory'
import AppKey from 'App/Models/AppKey'

export default Factory.define(AppKey, async ({ faker }) => {
  return {
    name: faker.internet.userName(),
    appId: faker.string.uuid(),
    appSecrete: faker.string.uuid() + '_' + faker.string.uuid(),
    obsolete: false,
  }
}).build()
