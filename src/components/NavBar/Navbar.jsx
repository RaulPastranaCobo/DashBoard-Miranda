import { useLocation } from "react-router-dom";
import {
  NavBar,
  TitleContainer,
  Title,
  MenuContainer,
  Icon,
} from "./NavBarStyle";

//import hamburguesaIcon from "../../assets/hamburguesaIcon";
//import correoIcon from "../assets/correo.png";
//import campanaIcon from "../assets/campana.png";
//import cerrarSesionIcon from "../assets/cerrar-sesion.png";

const Navbar = () => {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/rooms": "Rooms",
    "/bookings": "Bookings",
    "/users": "Users",
    "/contact": "Contact",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard Miranda";

  return (
    <NavBar>
      <TitleContainer>
        <Icon src="../src/assets/hamburguesa.png" alt="Menú" />
        <Title>{currentTitle}</Title>
      </TitleContainer>

      <MenuContainer>
        <Icon src="../src/assets/correo.png" alt="Correo" />
        <Icon src="../src/assets/campana.png" alt="Notificaciones" />
        <Icon src="../src/assets/cerrar-sesion.png" alt="Cerrar Sesión" />
      </MenuContainer>
    </NavBar>
  );
};

export default Navbar;
