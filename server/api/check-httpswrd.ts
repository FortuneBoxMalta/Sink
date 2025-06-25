import { defineEventHandler, useRuntimeConfig } from '#imports'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string, password: string }>(event)

  let config: any
  try {
    config = useRuntimeConfig()
  }
  catch (e) {
    return {
      success: false,
      error: 'Server config error',
      debug: {
        error: String(e),
        received: body,
        expected: 'Runtime config not available',
      },
    }
  }

  const expectedUsername = config?.HTTPSWRD_USERNAME ?? 'MISSING'
  const expectedPassword = config?.HTTPSWRD_PASSWORD ?? 'MISSING'

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
