import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ username: string, password: string }>(event)

  const correctUsername = config.HTTPSWRD_USERNAME
  const correctPassword = config.HTTPSWRD_PASSWORD

  if (!correctUsername || !correctPassword) {
    return {
      success: false,
      error: 'Server misconfigured',
      received: body,
      expected: {
        username: correctUsername,
        password: correctPassword,
      },
    }
  }

  if (
    body.username === correctUsername
    && body.password === correctPassword
  ) {
    return { success: true }
  }

  return {
    success: false,
    error: 'Unauthorized',
    received: body,
    expected: {
      username: correctUsername,
      password: correctPassword,
    },
  }
})
