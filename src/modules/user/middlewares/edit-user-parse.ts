import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'

const validationSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(6, { message: 'Name must have at least 6 characters' })
    .optional(),
  userName: z
    .string()
    .min(6, { message: 'Username must have at least 6 characters' })
    .optional(),
  email: z.string().email({ message: 'Invalid email' }).optional(),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' })
    .optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform((value) => {
      return new Date(value)
    })
    .optional(),
  avatarUrl: z.string().url({ message: 'Invalid URL' }).nullable().optional(),
  coverUrl: z.string().url({ message: 'Invalid URL' }).nullable().optional(),
})

export type UserSchema = z.infer<typeof validationSchema>

class EditUserParse {
  execute(request: Request, response: Response, next: NextFunction) {
    try {
      const data = validationSchema.parse(request.body)

      request.body = data

      next()
    } catch (error) {
      const zodError = error as ZodError

      const formattedError = zodError.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message,
        }
      })

      return response.status(400).json(formattedError)
    }
  }
}

export const editUserParse = new EditUserParse()
