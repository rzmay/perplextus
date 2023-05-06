import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'ui/components/button';
import Link from 'ui/components/link';

export default function GoogleLogin() {
  const router = useRouter();

  return (
    <Button
      as={Link}
      href={{ pathname: '/ajax/auth/login/google', query: router.query }}
      size="xl"
      className="w-full"
      icon={faGoogle}
      variant="primary"
    >
      Continue with Google
    </Button>
  );
}
