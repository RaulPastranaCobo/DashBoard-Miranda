import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom, updateRoom } from "../slices/roomsSlice";
import { useParams, useHistory } from "react-router-dom";

const EditRoomForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const room = useSelector((state) => state.rooms.room);

  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  useEffect(() => {
    dispatch(fetchRoom(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (room) {
      setRoomName(room.name);
      setRoomDescription(room.description);
    }
  }, [room]);

  const handleUpdateRoom = (e) => {
    e.preventDefault();

    if (!roomName || !roomDescription) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const updatedRoom = { id, name: roomName, description: roomDescription };
    dispatch(updateRoom(updatedRoom));
    history.push("/rooms");
  };

  if (!room) return <div>Loading...</div>;

  return (
    <form onSubmit={handleUpdateRoom}>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room Name"
        required
      />
      <textarea
        value={roomDescription}
        onChange={(e) => setRoomDescription(e.target.value)}
        placeholder="Room Description"
        required
      />
      <button type="submit">Update Room</button>
    </form>
  );
};

export default EditRoomForm;
