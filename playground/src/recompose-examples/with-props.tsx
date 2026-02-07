import React from 'react';
import { withProps } from 'recompose';

// User data interface
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Component props with computed props
interface UserCardProps {
  user: User;
  fullName: string;
  initials: string;
}

// Base component
const UserCard: React.FC<UserCardProps> = ({ user, fullName, initials }) => (
  <div>
    <div>
      <strong>{initials}</strong> - {fullName}
    </div>
    <div>Email: {user.email}</div>
  </div>
);

// Enhanced component with computed props
export const UserCardWithProps = withProps<
  { fullName: string; initials: string }, // props to inject
  { user: User } // outer props
>(({ user }) => ({
  fullName: `${user.firstName} ${user.lastName}`,
  initials: `${user.firstName[0]}${user.lastName[0]}`,
}))(UserCard);
