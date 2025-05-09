import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import BookingsData from "../data/BookingsData.json";

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

interface BookingsState {
  bookings: Booking[];
  booking: Booking | null;
}

const initialState: BookingsState = {
  bookings: [],
  booking: null,
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const STORAGE_KEY = "bookings";

const getStoredBookings = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const fallback = BookingsData as unknown as Booking[];

  try {
    const parsed = stored ? JSON.parse(stored) : fallback;
    return parsed.map((booking: any) => ({
      ...booking,
      id: Number(booking.id),
    }));
  } catch (error) {
    console.error("Error al leer reservas del localStorage:", error);
    return fallback;
  }
};

const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const fetchBookings = createAsyncThunk<Booking[]>(
  "bookings/fetchAll",
  async () => {
    await delay(200);
    return getStoredBookings();
  }
);

export const fetchBooking = createAsyncThunk<Booking | undefined, number>(
  "bookings/fetchOne",
  async (id: number) => {
    await delay(200);
    const bookings = getStoredBookings();
    return bookings.find((b) => b.id === id);
  }
);

export const createBooking = createAsyncThunk<Booking, Omit<Booking, "id">>(
  "bookings/create",
  async (booking) => {
    await delay(200);
    const bookings = getStoredBookings();
    const newBooking: Booking = {
      ...booking,
      id: Date.now(),
    };
    const updatedBookings = [...bookings, newBooking];
    saveBookings(updatedBookings);
    return newBooking;
  }
);

export const updateBooking = createAsyncThunk<Booking, Booking>(
  "bookings/update",
  async (booking) => {
    await delay(200);
    const bookings = getStoredBookings();
    const updatedBookings = bookings.map((b) =>
      b.id === booking.id ? { ...booking } : b
    );
    saveBookings(updatedBookings);
    return booking;
  }
);

export const deleteBooking = createAsyncThunk<number, number>(
  "bookings/delete",
  async (id) => {
    await delay(200);
    const bookings = getStoredBookings();
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    saveBookings(updatedBookings);
    return id;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.bookings = action.payload;
      })
      .addCase(fetchBooking.fulfilled, (state, action: PayloadAction<Booking | undefined>) => {
        state.booking = action.payload ?? null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.bookings = state.bookings.map((b) =>
          b.id === action.payload.id ? action.payload : b
        );
      })
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookingsSlice.reducer;
