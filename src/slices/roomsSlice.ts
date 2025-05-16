import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import RoomsData from "../data/RoomsData.json";
import { Room, RoomsState } from "../interfaces/roomInterface";



const initialState: RoomsState = {
  rooms: [],
  room: null,
  loading: false,
  error: null,
};


const STORAGE_KEY = "rooms";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getStoredRooms = (): Room[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const fallback = RoomsData as unknown as Room[];

  try {
    const parsed = stored ? JSON.parse(stored) : fallback;
    return parsed.map((room: any) => ({
      ...room,
      id: Number(room.id),
    }));
  } catch (error) {
    console.error("Error al leer habitaciones del localStorage:", error);
    return fallback;
  }
};

const saveRooms = (rooms: Room[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};



export const fetchRooms = createAsyncThunk<Room[]>(
  "rooms/fetchAll",
  async () => {
    await delay(200);
    return getStoredRooms();
  }
);

export const fetchRoom = createAsyncThunk<Room | undefined, number>(
  "rooms/fetchOne",
  async (id: number) => {
    await delay(200);
    const rooms = getStoredRooms();
    return rooms.find((r) => r.id === id);
  }
);

export const createRoom = createAsyncThunk<Room, Omit<Room, "id">>(
  "rooms/create",
  async (room) => {
    await delay(200);
    const rooms = getStoredRooms();
    const newRoom: Room = { ...room, id: Date.now() };
    const updatedRooms = [...rooms, newRoom];
    saveRooms(updatedRooms);
    return newRoom;
  }
);

export const updateRoom = createAsyncThunk<Room, Room>(
  "rooms/update",
  async (room) => {
    await delay(200);
    const rooms = getStoredRooms();
    const updatedRooms = rooms.map((r) =>
      r.id === room.id ? { ...room } : r
    );
    saveRooms(updatedRooms);
    return room;
  }
);

export const deleteRoom = createAsyncThunk<number, number>(
  "rooms/delete",
  async (id) => {
    await delay(200);
    const rooms = getStoredRooms();
    const updatedRooms = rooms.filter((room) => room.id !== id);
    saveRooms(updatedRooms);
    return id;
  }
);



const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar habitaciones";
      })

      .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<Room | undefined>) => {
        state.room = action.payload ?? null;
      })

      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms.push(action.payload);
      })

      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms = state.rooms.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
      })

      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);
      });
  },
});

export default roomsSlice.reducer;
