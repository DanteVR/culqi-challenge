import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsValidCardNumber (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidCardNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate (value: any) {
          const digits: number[] = value.toString().split('').map(Number)
          let sum = 0
          let isEven = false
          for (let i = digits.length - 1; i >= 0; i--) {
            let num = digits[i]
            if (isEven) {
              num *= 2
              if (num > 9) {
                num -= 9
              }
            }
            sum += num
            isEven = !isEven
          }
          return sum % 10 === 0
        }
      }
    })
  }
}

export function IsValidMonth (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidYear',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate (value: any) {
          return +value > 1 && +value <= 12
        }
      }
    })
  }
}

export function IsValidYear (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidYear',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate (value: any) {
          const year = new Date().getFullYear()
          return value.length === 4 && +value <= year + 5
        }
      }
    })
  }
}
