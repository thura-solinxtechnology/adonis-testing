import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import AppKeyFactory from 'Database/factories/AppKeyFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Login API', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('it should not login with invalid password', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const appKey = await AppKeyFactory.create()

    const response = await client
      .post('/api/auth/login')
      .json({ email: user.email, password: '1234' })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'password')

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: 422,
    })
  })

  test('it should not allow login with an email that is not registered', async ({
    client,
    assert,
  }) => {
    await UserFactory.create()
    const appKey = await AppKeyFactory.create()

    const response = await client
      .post('/api/auth/login')
      .json({ email: 'invalidemail', password: 'password' })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'email')

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: 422,
    })
  })

  test('it should login with correct credentials', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const appKey = await AppKeyFactory.create()

    const response = await client
      .post('/api/auth/login')
      .json({ email: user.email!, password: 'password' })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['data', 'message', 'status'])
    assert.properties(response.body().data, ['type', 'token'])
    assert.equal(response.body().data.type, 'bearer')

    response.assertStatus(200)
    response.assertBodyContains({
      data: {},
      message: 'Login success.',
      status: 200,
    })
  })
})
