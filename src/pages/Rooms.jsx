import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../slices/roomsSlice";
import RoomCard from "../components/RoomCard/RoomCard";

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div className="rooms-page">
      <thead>
        <tr>
          <th>Room Name</th>
          <th>Bed Type</th>
          <th>Facilities</th>
          <th>Rate</th>
          <th>Offer Price</th>
          <th>Cancellation Policy</th>
        </tr>
      </thead>
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
  );
};

export default Rooms;
