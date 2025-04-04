import React from "react";

const RoomCard = ({
  room_id,
  room_type,
  description,
  price,
  discount,
  cancellation_policy,
  amenities,
}) => {
  return (
    <div className="room-card">
      <table>
        <tbody>
          <tr>
            <td>{room_type}</td>
            {/* <td>{description}</td> */}
            <td>{amenities}</td>
            <td>{price} USD</td>
            <td>{discount} %</td>
            {/* <td>{cancellation_policy}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoomCard;
