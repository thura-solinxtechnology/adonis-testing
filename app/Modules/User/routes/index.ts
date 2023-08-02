import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'IndexController')
  Route.get('/profile', 'ShowController')
})
  .prefix('users')
  .namespace('App/Modules/User/Controllers')
  .middleware('auth:api')
