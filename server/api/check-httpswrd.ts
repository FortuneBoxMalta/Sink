import { defineEventHandler, useRuntimeConfig } from '#imports'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return {
      success: false,
      error: 'Method Not Allowed',
    }
  }

  const body = await readBody<{ username: string, password: string }>(event)
  const config = useRuntimeConfig()

  const expectedUsername = config.HTTPSWRD_USERNAME
  const expectedPassword = config.HTTPSWRD_PASSWORD

  console.log('🔐 check-httpswrd:', {
    username: body.username,
    password: body.password,
    expectedUsername,
    expectedPassword,
  })

  if (
    body.username !== expectedUsername
    || body.password !== expectedPassword
  ) {
    return {
      success: false,
      error: 'Unauthorized',
    }
  }

  return {
    success: true,
  }
})
