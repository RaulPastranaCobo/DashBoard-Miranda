import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, deleteRoom } from "../../slices/roomsSlice";
import RoomCard from "../../components/RoomCard/RoomCard";

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const numericId = Number(id);

    await dispatch(deleteRoom(numericId));
  };

  return (
    <div className="rooms-page">
      <h2>Lista de Habitaciones</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Bed Type</th>
            <th>Facilities</th>
            <th>Rate</th>
            <th>Offer Price</th>
            <th>Cancellation Policy</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="7">No hay habitaciones disponibles.</td>
            </tr>
          ) : (
            rooms.map((room, index) => (
              <tr key={room.room_id || `room-${index}`}>
                <td>{room.room_type || room.name || "N/A"}</td>

                <td>${room.price}</td>
                <td>${room.discount || "-"}</td>
                <td>{room.cancellation_policy}</td>
                <td>
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
