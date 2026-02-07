import React from 'react';
import { UserCardWithProps } from './with-props';

const sampleUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

export default () => <UserCardWithProps user={sampleUser} />;
