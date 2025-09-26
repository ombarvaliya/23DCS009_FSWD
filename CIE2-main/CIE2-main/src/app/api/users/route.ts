import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/users';

export async function GET() {
  try {
    const users = getAllUsers().map(user => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
