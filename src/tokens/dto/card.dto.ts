import { IsEmail, IsNumberString, MaxLength, MinLength } from 'class-validator'
import { IsValidCardNumber, IsValidMonth, IsValidYear } from '../utils/validators'

export class CardDto {
  @IsNumberString()
  @MinLength(13)
  @MaxLength(16)
  @IsValidCardNumber({ message: 'The card number is invalid' })
    card_number: string

  @IsNumberString()
  @MinLength(3)
  @MaxLength(4)
    cvv: string

  @IsNumberString()
  @IsValidMonth({ message: 'The expiration month is invalid' })
    expiration_month: string

  @IsNumberString()
  @IsValidYear({ message: 'The expiration year is invalid' })
    expiration_year: string

  @IsEmail()
    email: string
}
