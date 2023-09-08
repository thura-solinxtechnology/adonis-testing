import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { Status } from 'App/Http/Responses/Status'
import AppKeyFactory from 'Database/factories/AppKeyFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Register API', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('it should not register with no name', async ({ client, assert }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'name')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })

  test('it should not allow registration with a name that is too short', async ({
    client,
    assert,
  }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: 'a',
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'name')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })

  test('it should not allow registration with a name that is too long', async ({
    client,
    assert,
  }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: faker.string.alpha(200),
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'name')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })

  test('it should not allow registration without an email', async ({ client, assert }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: user.name,
        password: user.password,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'email')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })

  test('it should not allow registration with invalid email', async ({ client, assert }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: user.name,
        email: 'invalid',
        password: user.password,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'email')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })

  test('it should not allow registration without a password', async ({ client, assert }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: user.name,
        email: user.email,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'password')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })

  test('it should not allow registration without a password confirmation', async ({
    client,
    assert,
  }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    assert.onlyProperties(response.body(), ['errors', 'code', 'message', 'status'])
    assert.equal(response.body().errors[0].field, 'password_confirmation')

    response.assertStatus(Status.UNPROCESSABLE_CONTENT)
    response.assertBodyContains({
      errors: [],
      message: 'One or more input fields are invalid!',
      status: Status.UNPROCESSABLE_CONTENT,
    })

    Mail.restore()
  })
  test('it should register', async ({ client }) => {
    const appKey = await AppKeyFactory.create()
    const user = await UserFactory.make()

    Mail.fake()

    const response = await client
      .post('/api/auth/register')
      .json({
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      })
      .header('app-id', appKey.appId)
      .header('app-secrete', appKey.appSecrete)

    response.assertStatus(Status.CREATED)
    response.assertBodyContains({
      message: 'Register success. OTP code is sent to your email',
      status: Status.CREATED,
    })

    Mail.restore()
  })
})
