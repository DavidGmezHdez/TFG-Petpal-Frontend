export interface AuthState {
  token: string;
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: boolean;
  msg: string;
}
