import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'IndexController')
  Route.get('/profile', 'ShowController')
  Route.put('/profile', 'UpdateController')
})
  .namespace('App/Http/Controllers/User')
  .prefix('/api/users')
  .middleware(['checkAppKeys', 'auth:api'])
