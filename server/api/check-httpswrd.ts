export default defineEventHandler(() => {
  console.log('api working')
  return {
    status: 'ok',
    time: Date.now(),
  }
})
