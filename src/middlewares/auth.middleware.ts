import { Context, Callback, Handler } from 'aws-lambda'

export const authMiddleware = (handler: Handler) => {
  return async (event: any, context: Context, callback: Callback) => {
    try {
      const auth = event.headers.Authorization
      if (auth === undefined || auth.startsWith('Bearer ') === false) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Unauthorized' })
        }
      }
      const token = auth?.split(' ')[1]

      if (token === 'pk_test_2JWw9meMXbq7hS1Y') {
        const result = await handler(event, context, callback)
        return result
      } else {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: 'Forbidden' })
        }
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Ups! Internal Server Error' })
      }
    }
  }
}
