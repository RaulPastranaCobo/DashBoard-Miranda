import React from "react";

interface RoomCardProps {
  room_id: number;
  room_type: string;
  description?: string;
  price: number;
  discount?: number;
  cancellation_policy?: string;
  amenities?: string;
}


const RoomCard: React.FC<RoomCardProps> = ({
  room_id,
  room_type,
  description,
  price,
  discount = 0,
  amenities,
}) => {
  return (
    <div className="room-card" key={room_id}>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>{room_type}</strong>
            </td>
            <td>{amenities || "Sin amenidades"}</td>
            <td>{price} USD</td>
            <td>{discount}%</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoomCard;
