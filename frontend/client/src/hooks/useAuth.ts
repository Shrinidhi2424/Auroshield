import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export function useAuth() {
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  
  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
}
