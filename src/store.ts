import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./slices/roomsSlice";
import bookingsReducer from "./slices/bookingsSlice";
import usersReducer from "./slices/usersSlice";
import contactReducer from "./slices/contactSlice";

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    bookings: bookingsReducer,
    users: usersReducer,
    contact: contactReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
