import { CreateCardTokenResponse } from './create-card-token-response.interface'

export interface RetrieveCardTokenResponse extends CreateCardTokenResponse {
  card: {
    card_number: string
    expiration_month: string
    expiration_year: string
    email: string
  }
}
