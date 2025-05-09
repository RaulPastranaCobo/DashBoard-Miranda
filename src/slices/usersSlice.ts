import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UsersData from "../data/UserData.json";

// Tipos
export interface User {
  id: number;
  name: string;
  email: string;
  date: string;
  description: string;
  contact: string;
  status: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}


const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const STORAGE_KEY = "users";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const fallback = UsersData as unknown as User[];

  try {
    const parsed = stored ? JSON.parse(stored) : fallback;
    return parsed.map((user: any) => ({
      ...user,
      id: Number(user.id),
    }));
  } catch (error) {
    console.error("Error al leer usuarios del localStorage:", error);
    return fallback;
  }
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};



export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    await delay(200);
    return getStoredUsers();
  }
);

export const createUser = createAsyncThunk<User, Omit<User, "id">>(
  "users/createUser",
  async (newUser) => {
    await delay(200);
    const users = getStoredUsers();
    const newEntry: User = {
      ...newUser,
      id: Date.now(),
    };
    const updated = [...users, newEntry];
    saveUsers(updated);
    return newEntry;
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "users/updateUser",
  async (updatedUser) => {
    await delay(200);
    const users = getStoredUsers();
    const updated = users.map((u) =>
      u.id === updatedUser.id ? { ...updatedUser } : u
    );
    saveUsers(updated);
    return updatedUser;
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  "users/deleteUser",
  async (id) => {
    await delay(200);
    const users = getStoredUsers();
    const updated = users.filter((u) => u.id !== id);
    saveUsers(updated);
    return id;
  }
);


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener usuarios";
      })

      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
