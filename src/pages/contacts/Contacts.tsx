import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchContacts,
  deleteContact,
  createContact,
  updateContact,
  Contact,
} from "../../slices/contactSlice";
import { RootState } from "../../store";

const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state: RootState) => state.contact.contacts);

  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState<Partial<Contact>>({
    id: 1,
    date: "",
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteContact(id));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing && contactData.id !== undefined) {
      dispatch(updateContact(contactData as Contact));
    } else {
      const { id, ...newContact } = contactData;
      dispatch(createContact(newContact as Omit<Contact, "id">));
    }

    setIsEditing(false);
    setContactData({
      id: 1,
      date: "",
      name: "",
      email: "",
      phone: "",
      comment: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (contact: Contact) => {
    setContactData({ ...contact });
    setIsEditing(true);
  };

  return (
    <div className="contact-page">
      <h2>Mensajes de Contacto</h2>

      <div className="contact-form">
        <h3>{isEditing ? "Editar Mensaje" : "Nuevo Mensaje"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={contactData.date || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={contactData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={contactData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={contactData.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Comentario:</label>
            <textarea
              name="comment"
              value={contactData.comment || ""}
              onChange={handleChange}
            />
          </div>

          <button type="submit">{isEditing ? "Actualizar" : "Enviar"}</button>
        </form>
      </div>

      <table className="contact-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Comentario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={6}>No hay mensajes de contacto.</td>
            </tr>
          ) : (
            contacts.map((contact: Contact) => (
              <tr key={contact.id}>
                <td>{contact.date}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.comment}</td>
                <td>
                  <button onClick={() => handleEdit(contact)}>Editar</button>
                  <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
