import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  deleteRoom,
  createRoom,
  updateRoom,
} from "../../slices/roomsSlice";
import RoomCard from "../../components/RoomCard/RoomCard";

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);

  const [isEditing, setIsEditing] = useState(false);
  const [roomData, setRoomData] = useState({
    id: null,
    name: "",
    price: "",
    discount: "",
    cancellation_policy: "",
    amenities: "",
  });

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const numericId = Number(id);
    await dispatch(deleteRoom(numericId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(updateRoom(roomData));
    } else {
      dispatch(createRoom(roomData));
    }

    setIsEditing(false);
    setRoomData({
      id: null,
      name: "",
      price: "",
      discount: "",
      cancellation_policy: "",
      amenities: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (room) => {
    setRoomData({
      id: room.id,
      name: room.name,
      price: room.price,
      discount: room.discount,
      cancellation_policy: room.cancellation_policy,
      amenities: room.amenities,
    });
    setIsEditing(true);
  };

  return (
    <div className="rooms-page">
      <h2>Lista de Habitaciones</h2>

      <div className="room-form">
        <h3>{isEditing ? "Editar Habitación" : "Añadir Nueva Habitación"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de la habitación:</label>
            <input
              type="text"
              name="name"
              value={roomData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={roomData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Descuento:</label>
            <input
              type="number"
              name="discount"
              value={roomData.discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Política de Cancelación:</label>
            <input
              type="text"
              name="cancellation_policy"
              value={roomData.cancellation_policy}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Amenidades:</label>
            <input
              type="text"
              name="amenities"
              value={roomData.amenities}
              onChange={handleChange}
            />
          </div>

          <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
        </form>
      </div>

      <table className="room-table">
        <thead>
          <tr>
            <th>Nombre de la Habitación</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Política de Cancelación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="5">No hay habitaciones disponibles.</td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr key={room.room_id}>
                <td>{room.room_type || "N/A"}</td>
                <td>{room.price}</td>
                <td>{room.discount || "-"}</td>
                <td>{room.cancellation_policy}</td>
                <td>
                  <button onClick={() => handleEdit(room)}>Editar</button>
                  <button onClick={() => handleDelete(room.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="room-cards">
        {rooms.slice(0, 10).map((room) => (
          <RoomCard
            key={room.id}
            room_id={room.id}
            room_type={room.name}
            description={room.description}
            price={room.price}
            discount={room.discount}
            cancellation_policy={room.cancellation_policy}
            amenities={room.amenities}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
