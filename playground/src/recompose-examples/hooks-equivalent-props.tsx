import React, { useMemo } from 'react';

// User data interface
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Component props
interface UserCardProps {
  user: User;
}

// Modern React Hooks equivalent of recompose withProps
export const UserCardWithHooks: React.FC<UserCardProps> = ({ user }) => {
  // useMemo for computed/derived props (similar to withProps)
  const fullName = useMemo(
    () => `${user.firstName} ${user.lastName}`,
    [user.firstName, user.lastName]
  );

  const initials = useMemo(
    () => `${user.firstName[0] || ''}${user.lastName[0] || ''}`,
    [user.firstName, user.lastName]
  );

  return (
    <div>
      <div>
        <strong>{initials}</strong> - {fullName}
      </div>
      <div>Email: {user.email}</div>
    </div>
  );
};
