/* eslint-disable no-alert */

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server)
    return

  const isLoginPage = to.path === '/dashboard/login'
  const isDashboardRoute = to.path.startsWith('/dashboard')

  if (isLoginPage) {
    const alreadyAuthed = localStorage.getItem('httpswrd-ok')

    if (!alreadyAuthed) {
      const username = prompt('Username:')
      const password = prompt('Password:')

      console.log('🔐 Sending credentials:', { username, password })

      try {
        const res = await $fetch<{ success: boolean }>('/api/check-httpswrd', {
          method: 'POST',
          body: { username, password },
        })

        console.log('✅ API response from /check-httpswrd:', res)

        if (!res.success) {
          alert('Unauthorized')
          return navigateTo('/')
        }

        localStorage.setItem('httpswrd-ok', 'true')
      }
      catch (err) {
        console.error('❌ Error while calling /api/check-httpswrd:', err)
        alert('Login error')
        return navigateTo('/')
      }
    }

    try {
      await useAPI('/api/verify')
      return navigateTo('/dashboard')
    }
    catch (verifyError) {
      console.warn('⚠️ /api/verify failed:', verifyError)
    }
  }

  if (isDashboardRoute && !isLoginPage) {
    const sinkToken = localStorage.getItem('SinkSiteToken')

    if (!sinkToken) {
      console.warn('🔒 Missing SinkSiteToken → redirecting to login')
      return navigateTo('/dashboard/login')
    }
  }
})
