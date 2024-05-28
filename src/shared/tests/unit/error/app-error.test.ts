import { AppError } from '@/errors/app-error'

describe('app-error', () => {
  it('should be able to thwrow an error with status code', () => {
    const statusCode = 400
    const message = 'Error message'

    const error = new AppError(message, statusCode)

    expect(error.message).toBe(message)
    expect(error.statusCode).toBe(statusCode)
  })

  it('should be able to thwrow an error without status code', () => {
    const message = 'Error message'

    const error = new AppError(message)

    expect(error.message).toBe(message)
    expect(error.statusCode).toBe(400)
  })
})
