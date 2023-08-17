import CrytoService from './crypto.service'

describe('CryptoService', () => {
  const service = new CrytoService()
  const token = service.generateCardToken()

  it('Generate random bytes of 16 characters.', () => {
    expect(token).toHaveLength(16)
  })

  it('Validate if it contains alphanumeric characters.', () => {
    const regex = /^[a-zA-Z0-9]{16}$/
    expect(regex.test(token)).toBe(true)
  })
})
