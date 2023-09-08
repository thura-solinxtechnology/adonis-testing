import Route from '@ioc:Adonis/Core/Route'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import AppKey from 'App/Models/AppKey'
import * as uuid from 'uuid'

import './api/auth'
import './api/users'

Route.post('/api/keys-generate', async ({ request }) => {
  const appKey = await AppKey.create({
    name: request.body().name,
    appId: uuid.v4(),
    appSecrete: uuid.v4() + '-' + uuid.v4(),
  })

  return new ApiResponses().success({ data: appKey })
})

Route.get('/', ({ view }) => {
  return view.render('welcome')
})
