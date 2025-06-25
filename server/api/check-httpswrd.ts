import { defineEventHandler, useRuntimeConfig } from '#imports'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string, password: string }>(event)
  const config = useRuntimeConfig()

  console.log('🔍 check-httpswrd BODY:', body)
  console.log('🔐 config USERNAME:', config.HTTPSWRD_USERNAME)
  console.log('🔐 config PASSWORD:', config.HTTPSWRD_PASSWORD)

  if (
    body.username !== config.HTTPSWRD_USERNAME
    || body.password !== config.HTTPSWRD_PASSWORD
  ) {
    console.log('❌ Unauthorized attempt')
    return {
      success: false,
      error: 'Unauthorized',
    }
  }

  console.log('✅ Authorized')
  return {
    success: true,
  }
})
