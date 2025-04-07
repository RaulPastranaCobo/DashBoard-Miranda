import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../slices/roomsSlice";

const CreateRoomForm = () => {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (!roomName || !roomDescription) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newRoom = { name: roomName, description: roomDescription };
    dispatch(createRoom(newRoom));  // Dispatching the createRoom thunk
    setRoomName("");  // Clear the form
    setRoomDescription("");
  };

  return (
    <form onSubmit={handleCreateRoom}>
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
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoomForm;
