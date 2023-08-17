import CryptoService from '../services/crypto.service'
import { CardDto } from '../dto/card.dto'
import { RetrieveCardTokenResponse } from '../interfaces/retrieve-card-token-response.interface'
import { CreateCardTokenResponse } from '../interfaces/create-card-token-response.interface'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { createClient } from 'redis'
import { env } from '../../env'
import { exclude } from '../utils/exclude'

class TokensService {
  private readonly client

  constructor () {
    this.client = createClient({
      url: `redis://${env.redis_db_host}:${env.redis_db_port}`
    })
  }

  public verifyConnection = async (): Promise<void> => {
    if (!this.client.isReady) {
      await this.client.connect()
    }
  }

  public create = async (dto: CardDto): Promise<CreateCardTokenResponse> => {
    const card = plainToClass(CardDto, dto)
    const errors = await validate(card)

    if (errors.length > 0) {
      const fields = errors.map(err => err.property).join(',')
      throw new Error(
        `Invalid values, check the following fields: ${fields}`
      )
    } else {
      const cryptoService = new CryptoService()
      const token = cryptoService.generateCardToken()
      await this.store(token, card)
      return { token }
    }
  }

  private readonly store = async (token: string, card: CardDto): Promise<void> => {
    await this.verifyConnection()
    const expiration = env.redis_token_expiration

    const response = await this.client.setEx(
      token, expiration, JSON.stringify(card)
    )

    if (response === 'OK') {
      console.log(`Stored token, expire in ${expiration / 60} min`)
    }
    await this.client.quit()
  }

  public retrieve = async (token: string): Promise<RetrieveCardTokenResponse> => {
    await this.verifyConnection()

    const response = await this.client.get(token)
    if (response !== null) {
      const object = JSON.parse(response)

      const card: RetrieveCardTokenResponse = {
        token,
        card: {
          ...exclude(object, 'cvv')
        }
      }

      await this.client.quit()

      return card
    } else {
      throw new Error(
        'The token is invalid or has expired'
      )
    }
  }
}

export default TokensService
