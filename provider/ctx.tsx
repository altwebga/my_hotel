import React from 'react';
import axios from 'axios';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{
  register: (username: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  register: async () => {},
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/local/register`, // Strapi URL: domain/api/auth/local/register
        { username, email, password },
        { headers: { Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}` } }
      );
      setSession(response.data.jwt);
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/local`,
        { identifier: email, password },
        { headers: { Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}` } }
      );
      setSession(response.data.jwt);
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
