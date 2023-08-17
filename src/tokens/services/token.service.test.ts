import { CardDto } from '../dto/card.dto'
import { CreateCardTokenResponse } from '../interfaces/create-card-token-response.interface'
import TokenService from './token.service'

describe('TokenService', () => {
  const validCard: CardDto = {
    card_number: '4242424242424242',
    cvv: '123',
    expiration_month: '12',
    expiration_year: '2028',
    email: 'dantevilla006@gmail.com'
  }

  const invalidCard: CardDto = {
    card_number: '4242424242424245',
    cvv: '123456',
    expiration_month: '16',
    expiration_year: '2050',
    email: 'dantevilla006@gmail.com'
  }

  const service = new TokenService()

  it('Validate if the card details are valid.', async () => {
    const result: CreateCardTokenResponse = await service.create(validCard)
    expect(typeof result).toBe('object')
    expect(result).toHaveProperty('token')
  })

  it('Validate incorrect card data.', async () => {
    try {
      await service.create(invalidCard)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
