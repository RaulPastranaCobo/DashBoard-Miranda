import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchUsers,
  deleteUser,
  createUser,
  updateUser,
  User,
} from "../../slices/usersSlice";
import { RootState } from "../../store";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<Partial<User>>({
    id: 1,
    name: "",
    email: "",
    date: "",
    description: "",
    contact: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteUser(id));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing && userData.id !== undefined) {
      dispatch(updateUser(userData as User));
    } else {
      const { id, ...newUser } = userData;
      dispatch(createUser(newUser as Omit<User, "id">));
    }

    setIsEditing(false);
    setUserData({
      id: 1,
      name: "",
      email: "",
      date: "",
      description: "",
      contact: "",
      status: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (user: User) => {
    setUserData({
      id: user.id,
      name: user.name,
      email: user.email,
      date: user.date,
      description: user.description,
      contact: user.contact,
      status: user.status,
    });
    setIsEditing(true);
  };

  return (
    <div className="users-page">
      <h2>Lista de Usuarios</h2>

      <div className="user-form">
        <h3>{isEditing ? "Editar Usuario" : "Añadir Nuevo Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={userData.date || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={userData.description || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Contacto:</label>
            <input
              type="text"
              name="contact"
              value={userData.contact || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Estado:</label>
            <input
              type="text"
              name="status"
              value={userData.status || ""}
              onChange={handleChange}
            />
          </div>

          <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
        </form>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Contacto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7}>No hay usuarios disponibles.</td>
            </tr>
          ) : (
            users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.date}</td>
                <td>{user.description}</td>
                <td>{user.contact}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
