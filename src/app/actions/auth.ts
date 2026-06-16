'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from '@/app/lib/definitions'
import { createUser, getUserByEmail } from '@/app/lib/mongodb'
import { createSession, deleteSession } from '@/app/lib/session'

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

  // `createUser` returns null when an account already exists for the email.
  if (!userId) {
    return {
      message: 'An account with this email already exists.',
    }
  }

  // 4. Create the user session
  await createSession(userId)

  // 5. Redirect the user
  redirect('/profile')
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  // 2. Look up the user and verify the password. Use a single generic message
  // so we don't reveal whether the email or the password was wrong.
  const user = await getUserByEmail(email)
  const passwordsMatch = user
    ? await bcrypt.compare(password, user.password)
    : false

  if (!user || !passwordsMatch) {
    return {
      message: 'Invalid email or password.',
    }
  }

  // 3. Create the user session
  await createSession(user._id.toString())

  // 4. Redirect the user
  redirect('/profile')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
