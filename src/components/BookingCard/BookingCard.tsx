import React from "react";

interface BookingCardProps {
  booking_id: number;
  customer_name: string;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  discount?: number;
  status: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking_id,
  customer_name,
  room_type,
  check_in_date,
  check_out_date,
  total_price,
  discount = 0,
  status,
}) => {
  return (
    <div className="booking-card" key={booking_id}>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>{customer_name}</strong>
            </td>
            <td>{room_type}</td>
            <td>{check_in_date} - {check_out_date}</td>
            <td>{total_price} USD</td>
            <td>{discount}%</td>
            <td>{status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingCard;
