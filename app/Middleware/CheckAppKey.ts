import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { Status } from 'App/Http/Responses/Status'
import AppKey from 'App/Models/AppKey'

export default class CheckAppKey {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const appId = request.header('app-id')
    const appSecrete = request.header('app-secrete')

    if (!appId || !appSecrete) {
      return new ApiResponses().error({
        message: 'You do not have permission to access api!',
        status: Status.FORBIDDEN,
      })
    }

    const appKey = await AppKey.query()
      .where('app_id', appId!)
      .where('app_secrete', appSecrete!)
      .first()

    if (!appKey) {
      return new ApiResponses().error({
        message: 'Your app-key is mismatch!',
        status: Status.UNAUTHORIZED,
      })
    }

    if (appKey.obsolete) {
      return new ApiResponses().error({
        message: 'Your app-id and app-secrete key is obsoleted!',
        status: Status.UNAUTHORIZED,
      })
    }

    await next()
  }
}
