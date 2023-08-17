import crypto from 'crypto'

class CryptoService {
  private generateRandomBytes (length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length)
      token += characters.charAt(randomIndex)
    }
    return token
  }

  generateCardToken (): string {
    const token = this.generateRandomBytes(16)
    return token
  }
}

export default CryptoService
