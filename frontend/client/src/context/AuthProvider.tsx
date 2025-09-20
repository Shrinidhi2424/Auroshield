import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { setUser, handleRedirectResult } from '../store/authSlice';
import type { AppDispatch } from '../store/store';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setLocalUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(handleRedirectResult());

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLocalUser(firebaseUser);
      dispatch(setUser(firebaseUser));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
