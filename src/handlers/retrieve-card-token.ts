import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { authMiddleware } from 'src/middlewares/auth.middleware'
import { RetrieveCardTokenResponse } from 'src/tokens/interfaces/retrieve-card-token-response.interface'
import TokensService from 'src/tokens/services/token.service'

const retrieveCardTokenhandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const token = event.pathParameters?.token
  let response: APIGatewayProxyResult

  if (token === undefined) {
    throw new Error('Invalid token')
  }

  try {
    const res = await retrieveCardToken(token)

    response = {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (error: any) {
    response = {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    }
  }
  return response
}

const retrieveCardToken = async (token: string): Promise<RetrieveCardTokenResponse> => {
  const service = new TokensService()
  return await service.retrieve(token)
}

export const handler = authMiddleware(retrieveCardTokenhandler)
