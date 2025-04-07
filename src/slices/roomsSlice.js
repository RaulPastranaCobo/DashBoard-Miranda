import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RoomsData from "../data/RoomsData.json";

// Función para simular un retardo (delay)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Funciones Helpers para manejar localStorage
const STORAGE_KEY = "rooms";

// Siempre convierte los IDs a Number al leer desde el storage
const getStoredRooms = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const rooms = stored ? JSON.parse(stored) : RoomsData; // Usa RoomsData si no hay datos en localStorage
  return rooms.map((room) => ({ ...room, id: Number(room.id) }));
};

const saveRooms = (rooms) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};

// Thunks

// Obtener todas las habitaciones
export const fetchRooms = createAsyncThunk("rooms/fetchAll", async () => {
  await delay(200);
  return getStoredRooms();
});

// Obtener una habitación por ID
export const fetchRoom = createAsyncThunk("rooms/fetchOne", async (id) => {
  await delay(200);
  const rooms = getStoredRooms();
  return rooms.find((r) => r.id === Number(id));
});

// Crear nueva habitación
export const createRoom = createAsyncThunk("rooms/create", async (room) => {
  await delay(200);
  const rooms = getStoredRooms();
  const newRoom = { ...room, id: Date.now() }; // ID único basado en la fecha actual
  const updatedRooms = [...rooms, newRoom];
  saveRooms(updatedRooms);
  return newRoom;
});

// Actualizar habitación existente
export const updateRoom = createAsyncThunk("rooms/update", async (room) => {
  await delay(200);
  const rooms = getStoredRooms();
  const updatedRooms = rooms.map((r) =>
    r.id === Number(room.id) ? { ...room, id: Number(room.id) } : r
  );
  saveRooms(updatedRooms);
  return room;  // Devolvemos la habitación actualizada
});

// Eliminar habitación
export const deleteRoom = createAsyncThunk("rooms/delete", async (id) => {
  await delay(200);
  const rooms = getStoredRooms();
  const updatedRooms = rooms.filter((room) => Number(room.id) !== Number(id));
  saveRooms(updatedRooms);
  return Number(id); // Devolvemos el id de la habitación eliminada
});

// Slice
const roomsSlice = createSlice({
  name: "rooms",
  initialState: { rooms: [], room: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Acción para obtener todas las habitaciones
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      // Acción para obtener una habitación específica
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.room = action.payload;
      })
      // Acción para crear una nueva habitación
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);  // Añadimos la nueva habitación al array
      })
      // Acción para actualizar una habitación existente
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.map((r) =>
          r.id === action.payload.id ? action.payload : r  // Actualizamos la habitación con el mismo ID
        );
      })
      // Acción para eliminar una habitación
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((r) => r.id !== action.payload);  // Eliminamos la habitación con el ID recibido
      });
  },
});

export default roomsSlice.reducer;
