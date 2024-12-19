'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';

const displayValue = (value: Date | null | undefined) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleString();
};

export default function UserInfo() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your information.</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
      <p><strong>Created At:</strong> {displayValue(user.createdAt)}</p>
      <p><strong>Updated At:</strong> {displayValue(user.updatedAt)}</p>
      <p><strong>Last Sign-In At:</strong> {displayValue(user.lastSignInAt)}</p>
      {/* Add more user fields as needed */}
    </div>
  );
};

