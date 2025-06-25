import { defineEventHandler, useRuntimeConfig } from '#imports'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string, password: string }>(event)
  const config = useRuntimeConfig()

  console.log('🔍 BODY:', body)
  console.log('🔐 CONFIG:', {
    HTTPSWRD_USERNAME: config.HTTPSWRD_USERNAME,
    HTTPSWRD_PASSWORD: config.HTTPSWRD_PASSWORD,
  })

  const expectedUsername = config.HTTPSWRD_USERNAME
  const expectedPassword = config.HTTPSWRD_PASSWORD

  if (
    body.username !== expectedUsername
    || body.password !== expectedPassword
  ) {
    console.log('❌ Unauthorized login attempt')
    return {
      success: false,
      error: 'Unauthorized',
    }
  }

  console.log('✅ Authorized login')
  return {
    success: true,
  }
})
