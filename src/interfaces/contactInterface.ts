export interface Contact {
  id: number;
  date: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
}

export interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}