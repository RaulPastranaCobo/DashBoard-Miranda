export interface User {
  id: number;
  name: string;
  email: string;
  date: string;
  description: string;
  contact: string;
  status: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}
