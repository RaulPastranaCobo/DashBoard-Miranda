import {
  SidebarContainer,
  SidebarTitle,
  SidebarSubtitle,
  NavList,
  NavItem,
  StyledLink,
  SidebarContact,
  ContactImage,
  ContactName,
  ContactMail,
  ContactButton,
  SidebarFooter,
} from "../Sidebar/SideBarStyle";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div>
        <SidebarTitle>travl</SidebarTitle>
        <SidebarSubtitle>Hotel Admin Dashboard</SidebarSubtitle>
        <nav>
          <NavList>
            <NavItem>
              <StyledLink to="/">Dashboard</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/rooms">Room</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/bookings">Bookings</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/users">Guest</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/contact">Concierge</StyledLink>
            </NavItem>
          </NavList>
        </nav>
      </div>

      <div>
        <SidebarContact>
          <ContactImage src="" alt="User" />
          <ContactName>Raúl Pastrana Cobo</ContactName>
          <ContactMail>rapasco97@gmail.com</ContactMail>
          <ContactButton>Contact Us</ContactButton>
        </SidebarContact>

        <SidebarFooter>
          <p>Travl Hotel Admin Dashboard</p>
          <p>© 2020 All Rights Reserved</p>
          <p>Made with ♥ by Peterdraw</p>
        </SidebarFooter>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
