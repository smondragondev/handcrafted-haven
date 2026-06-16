'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { createUser } from '@/app/lib/mongodb'

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If validation fails, return the field errors. This is what populates
  // `state.errors` in the SignUp page.
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  // 2. Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user into the database
  const userId = await createUser({ name, email, password: hashedPassword })

  if (!userId) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
