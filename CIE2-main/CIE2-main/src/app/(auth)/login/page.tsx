import { LoginForm } from '@/components/auth/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | UserDash',
    description: 'Log in to your UserDash account.',
};

export default function LoginPage() {
  return <LoginForm />;
}
