import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { Status } from 'App/Http/Responses/Status'
import AppKey from 'App/Models/AppKey'

export default class CheckAppKey {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const appId = request.header('app-id')
    const appSecrete = request.header('app-secrete')

    if (!appId || !appSecrete) {
      return ApiResponses.error(response, {
        message: 'You do not have permission to access api!',
        status: Status.FORBIDDEN,
      })
    }

    const appKey = await AppKey.query()
      .where('app_id', appId!)
      .where('app_secrete', appSecrete!)
      .first()

    if (!appKey) {
      return ApiResponses.error(response, {
        message: 'Unauthorized!',
        status: Status.UNAUTHORIZED,
      })
    }

    if (appKey.obsolete) {
      return ApiResponses.error(response, {
        message: 'Your app-id and app-secrete key is obsoleted!',
        status: Status.UNAUTHORIZED,
      })
    }

    await next()
  }
}
