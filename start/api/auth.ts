import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'LoginController')
  Route.post('/register', 'RegisterController')
  Route.post('/email-verify', 'VerifyController')
  Route.post('/otp-resend', 'ResendController')
  Route.post('/forgot', 'ResetController')
  Route.post('/:type/login', 'SocialLoginsController')
  Route.delete('/logout', 'LogoutController').middleware('auth:api')
})
  .namespace('App/Http/Controllers/Auth')
  .prefix('/api/auth')
  .middleware('checkAppKeys')
