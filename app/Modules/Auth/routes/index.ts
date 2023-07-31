import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/:type/login', 'SocialLoginsController')
  Route.delete('/logout', 'LogoutController').middleware('auth:api')
})
  .namespace('App/Modules/Auth/Controllers')
  .prefix('auth')
