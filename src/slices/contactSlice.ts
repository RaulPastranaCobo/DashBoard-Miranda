import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import contactsData from "../data/ContactData.json"; 

export interface Contact {
  id: number;
  date: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  return contactsData as Contact[];
});

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (newContact: Omit<Contact, "id">) => {
    const response = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });
    if (!response.ok) throw new Error("Error al crear el contacto");
    return (await response.json()) as Contact;
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (updatedContact: Contact) => {
    const response = await fetch(`/api/contacts/${updatedContact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    });
    if (!response.ok) throw new Error("Error al actualizar el contacto");
    return (await response.json()) as Contact;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: number) => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el contacto");
    return id;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      })
      .addCase(createContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        const index = state.contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;
