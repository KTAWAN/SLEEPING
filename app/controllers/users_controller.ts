import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/register_user'
import User from '#models/user'

export default class UsersController {
  async login({ auth, request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)

    response.redirect().toRoute('home.page')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.redirect().toRoute('login')
  }

  async register({ session, request, response, view }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create({ username: payload.username, password: payload.password })

    if (user) {
      session.flash('message', {
        type: 'positive',
        message: 'The user is register successfully. Please use username and password to login.',
      })
      return view.render('signin')
    }
  }

  async verifyUsername({ request, response }: HttpContext) {
    const username = request.input('username')
    const exists = await User.findBy('username', username)

    if (exists) {
      return response.status(203).send('The username is already used!')
    }

    return response.send('OK')
  }

  public async signup({ view }: HttpContext) {
    return view.render('pages/register')
  }
}
