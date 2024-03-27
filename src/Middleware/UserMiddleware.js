import { useAuth0 } from '@auth0/auth0-react';

const UseUsername = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return null;
  }
  if (user.username) {
    return user.username;
  } else if (user.name) {
    return user.name;
  }
  return null;
};

const GetUsername = async () => {
    const { user, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
      return null;
    }
    else if (user.username!==undefined) {
        return user.username;
        }
    else if (user.name!==undefined) {
        return user.name;
        }
    return null;
  };
  

export { UseUsername, GetUsername };
