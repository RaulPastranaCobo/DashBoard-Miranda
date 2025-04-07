import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RoomsData from "../data/RoomsData.json";


const delay = (ms) => new Promise((res) => setTimeout(res, ms));


const STORAGE_KEY = "rooms";


const getStoredRooms = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const rooms = stored ? JSON.parse(stored) : RoomsData;
  return rooms.map((room) => ({ ...room, id: Number(room.id) }));
};

const saveRooms = (rooms) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};


export const fetchRooms = createAsyncThunk("rooms/fetchAll", async () => {
  await delay(200);
  return getStoredRooms();
});


export const fetchRoom = createAsyncThunk("rooms/fetchOne", async (id) => {
  await delay(200);
  const rooms = getStoredRooms();
  return rooms.find((r) => r.id === Number(id));
});

export const createRoom = createAsyncThunk("rooms/create", async (room) => {
  await delay(200);
  const rooms = getStoredRooms();
  const newRoom = { ...room, id: Date.now() };
  const updatedRooms = [...rooms, newRoom];
  saveRooms(updatedRooms);
  return newRoom;
});


export const updateRoom = createAsyncThunk("rooms/update", async (room) => {
  await delay(200);
  const rooms = getStoredRooms();
  const updatedRooms = rooms.map((r) =>
    r.id === Number(room.id) ? { ...room, id: Number(room.id) } : r
  );
  saveRooms(updatedRooms);
  return room;
});


export const deleteRoom = createAsyncThunk("rooms/delete", async (id) => {
  await delay(200);
  const rooms = getStoredRooms();
  const updatedRooms = rooms.filter((room) => Number(room.id) !== Number(id));
  saveRooms(updatedRooms);
  return Number(id);
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
        state.rooms = state.rooms.map((r) =>
          r.id === action.payload.id ? action.payload : r 
        );
      })
     
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((r) => r.id !== action.payload); 
      });
  },
});

export default roomsSlice.reducer;
