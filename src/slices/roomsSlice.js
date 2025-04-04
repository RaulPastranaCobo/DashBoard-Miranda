import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));


export const fetchRooms = createAsyncThunk("rooms/fetchAll", async () => {
  await delay(200);
  return [{ id: 1, name: "Room 1" }];
});


export const fetchRoom = createAsyncThunk("rooms/fetchOne", async (id) => {
  await delay(200);
  return { id, name: `Room ${id}` };
});


export const createRoom = createAsyncThunk("rooms/create", async (room) => {
  await delay(200);
  return room;
});


export const updateRoom = createAsyncThunk("rooms/update", async (room) => {
  await delay(200);
  return room;
});


export const deleteRoom = createAsyncThunk("rooms/delete", async (id) => {
  await delay(200);
  return id;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: { rooms: [], room: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.room = action.payload;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.map((r) => (r.id === action.payload.id ? action.payload : r));
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
      });
  },
});

export default roomsSlice.reducer;