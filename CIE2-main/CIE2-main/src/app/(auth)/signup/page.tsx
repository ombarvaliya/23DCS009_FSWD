import { SignUpForm } from '@/components/auth/signup-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | UserDash',
    description: 'Create a new UserDash account.',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
