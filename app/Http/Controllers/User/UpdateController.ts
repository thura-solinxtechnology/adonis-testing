import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { v4 } from 'uuid'

export default class UpdateController {
  public async handle({ request, auth }: HttpContextContract) {
    const profileImage = request.file('profile_image')

    if (profileImage) {
      const path = `adonis/profiles/`
      const name = `${v4()}.${profileImage.extname}`
      await profileImage.moveToDisk(path, {
        name: name,
      })

      await auth.user?.merge({ profileImage: path + name }).save()
    }

    return new ApiResponses().success({ data: auth.user })
  }
}
