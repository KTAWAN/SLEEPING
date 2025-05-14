import type { HttpContext } from '@adonisjs/core/http'
import { registerUserValidator } from '#validators/register_user'
import User from '#models/user'

export default class UsersController {
  async login({ auth, request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    return response.redirect().toRoute('home.page')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('login')
  }

  async register({ session, request, response, view }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create({ username: payload.username, password: payload.password })

    session.flash('message', {
      type: 'positive',
      message: 'The user is registered successfully. Please log in.',
    })
    return view.render('signin')
  }

  async verifyUsername({ request, response }: HttpContext) {
    const exists = await User.findBy('username', request.input('username'))
    return exists ? response.status(203).send('Username already in use!') : response.send('OK')
  }

  public async signup({ view }: HttpContext) {
    return view.render('pages/register')
  }
}