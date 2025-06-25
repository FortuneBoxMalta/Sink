import { defineEventHandler } from '#imports'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string, password: string }>(event)

  const expectedUsername = 'fortune'
  const expectedPassword = 'ynRrICAahmsU0iUvzGNp'

  const authorized
    = body.username === expectedUsername
      && body.password === expectedPassword

  return {
    success: authorized,
    error: authorized ? undefined : 'Unauthorized',
  }
})
