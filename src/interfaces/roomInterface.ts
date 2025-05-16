export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
  cancellation_policy?: string;
  amenities?: string;
  room_type?: string;
}

export interface RoomsState {
  rooms: Room[];
  room: Room | null;
  loading: boolean;
  error: string | null;
}
