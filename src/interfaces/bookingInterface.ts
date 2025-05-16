export interface Booking {
  id: number;
  customer_name: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  discount?: number;
  status: string;
}

export interface BookingsState {
  bookings: Booking[];
  booking: Booking | null;
}
