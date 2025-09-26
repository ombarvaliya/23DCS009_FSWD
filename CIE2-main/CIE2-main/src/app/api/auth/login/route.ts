import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/users';
import { LoginSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.formErrors }, { status: 400 });
    }

    const { email, password } = validation.data;

    const user = findUserByEmail(email);

    if (!user || user.password_hash !== password) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword, message: 'Login successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
