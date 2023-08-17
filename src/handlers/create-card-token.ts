import 'reflect-metadata'
import { CreateCardTokenResponse } from '../tokens/interfaces/create-card-token-response.interface'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CardDto } from '../tokens/dto/card.dto'
import { authMiddleware } from 'src/middlewares/auth.middleware'
import TokensService from '../tokens/services/token.service'

const createCardTokenhandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult

  try {
    const dto = JSON.parse(event.body ?? '') as CardDto
    const res = await createCardToken(dto)

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

const createCardToken = async (dto: CardDto): Promise<CreateCardTokenResponse> => {
  const service = new TokensService()
  return await service.create(dto)
}

export const handler = authMiddleware(createCardTokenhandler)
