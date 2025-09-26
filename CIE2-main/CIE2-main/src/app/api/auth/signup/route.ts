import { NextRequest, NextResponse } from 'next/server';
import { addUser, findUserByEmail, getAllUsers } from '@/lib/users';
import { SignUpSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = SignUpSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid input', errors: validation.error.formErrors }, { status: 400 });
    }

    const { name, email, password } = validation.data;

    if (findUserByEmail(email)) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }
    
    const isFirstUser = getAllUsers().length === 0;

    const newUser = addUser({
      name,
      email,
      password_hash: password, // Storing plaintext password for demo purposes ONLY
      role: isFirstUser ? 'admin' : 'user',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = newUser;

    return NextResponse.json({ user: userWithoutPassword, message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
