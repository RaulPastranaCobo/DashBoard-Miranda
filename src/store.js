import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./slices/roomsSlice";
// import bookingsReducer from "./slices/bookingsSlice";
// import usersReducer from "./slices/usersSlice";
// import contactReducer from "./slices/contactSlice";

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    // bookings: bookingsReducer,
    // users: usersReducer,
    // contact: contactReducer,
  },
});

export default store;
