import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchBookings,
  deleteBooking,
  createBooking,
  updateBooking,
  Booking,
} from "../../slices/bookingsSlice";
import BookingCard from "../../components/BookingCard/BookingCard";
import { RootState } from "../../store";

const Bookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector((state: RootState) => state.bookings.bookings);

  const [isEditing, setIsEditing] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<Booking>>({
    id: 1,
    customer_name: "",
    room_type: "",
    check_in_date: "",
    check_out_date: "",
    total_price: 0,
    discount: 0,
    status: "",
  });

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteBooking(id));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing && bookingData.id !== null && bookingData.id !== undefined) {
      dispatch(updateBooking(bookingData as Booking));
    } else {
      const { id, ...newBooking } = bookingData;
      dispatch(createBooking(newBooking as Omit<Booking, "id">));
    }

    setIsEditing(false);
    setBookingData({
      id: 1,
      customer_name: "",
      room_type: "",
      check_in_date: "",
      check_out_date: "",
      total_price: 0,
      discount: 0,
      status: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: name === "total_price" || name === "discount" ? Number(value) : value,
    }));
  };

  const handleEdit = (booking: Booking) => {
    setBookingData({
      id: booking.id,
      customer_name: booking.customer_name,
      room_type: booking.room_type,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      total_price: booking.total_price,
      discount: booking.discount,
      status: booking.status,
    });
    setIsEditing(true);
  };

  return (
    <div className="bookings-page">
      <h2>Lista de Reservas</h2>

      <div className="booking-form">
        <h3>{isEditing ? "Editar Reserva" : "Añadir Nueva Reserva"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre del Cliente:</label>
            <input
              type="text"
              name="customer_name"
              value={bookingData.customer_name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Tipo de Habitación:</label>
            <input
              type="text"
              name="room_type"
              value={bookingData.room_type || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Fecha de Entrada:</label>
            <input
              type="date"
              name="check_in_date"
              value={bookingData.check_in_date || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Fecha de Salida:</label>
            <input
              type="date"
              name="check_out_date"
              value={bookingData.check_out_date || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Precio Total:</label>
            <input
              type="number"
              name="total_price"
              value={bookingData.total_price || 0}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Descuento:</label>
            <input
              type="number"
              name="discount"
              value={bookingData.discount || 0}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Estado de la Reserva:</label>
            <input
              type="text"
              name="status"
              value={bookingData.status || ""}
              onChange={handleChange}
            />
          </div>

          <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
        </form>
      </div>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Nombre del Cliente</th>
            <th>Tipo de Habitación</th>
            <th>Fechas</th>
            <th>Precio Total</th>
            <th>Descuento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={7}>No hay reservas disponibles.</td>
            </tr>
          ) : (
            bookings.map((booking: Booking) => (
              <tr key={booking.id}>
                <td>{booking.customer_name || "N/A"}</td>
                <td>{booking.room_type}</td>
                <td>{booking.check_in_date} - {booking.check_out_date}</td>
                <td>{booking.total_price}</td>
                <td>{booking.discount || "-"}</td>
                <td>{booking.status}</td>
                <td>
                  <button onClick={() => handleEdit(booking)}>Editar</button>
                  <button onClick={() => handleDelete(booking.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="booking-cards">
        {bookings.slice(0, 10).map((booking: Booking) => (
          <BookingCard
            key={booking.id}
            booking_id={booking.id}
            customer_name={booking.customer_name}
            room_type={booking.room_type}
            check_in_date={booking.check_in_date}
            check_out_date={booking.check_out_date}
            total_price={booking.total_price}
            discount={booking.discount}
            status={booking.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
