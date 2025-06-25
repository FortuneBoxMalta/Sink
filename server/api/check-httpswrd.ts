import { defineEventHandler, useRuntimeConfig } from '#imports'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string, password: string }>(event)
  const config = useRuntimeConfig()

  const expectedUsername = config.HTTPSWRD_USERNAME
  const expectedPassword = config.HTTPSWRD_PASSWORD

  const authorized = (
    body.username === expectedUsername
    && body.password === expectedPassword
  )

  return {
    debug: {
      received: body,
      expected: {
        username: expectedUsername,
        password: expectedPassword,
      },
    },
    success: authorized,
    error: authorized ? undefined : 'Unauthorized',
  }
})
