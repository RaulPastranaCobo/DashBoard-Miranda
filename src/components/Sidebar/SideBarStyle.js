import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export const SidebarTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 5px;
`;

export const SidebarSubtitle = styled.p`
  font-size: 14px;
  color: #718096;
  margin-bottom: 20px;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin: 15px 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #2d3748;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const SidebarContact = styled.div`
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  background-color: #f9fafb;
  margin-top: 20px;
`;

export const ContactImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #d1d5db;
  margin-bottom: 10px;
`;

export const ContactName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #2d3748;
`;

export const ContactMail = styled.p`
  font-size: 12px;
  color: #718096;
`;

export const ContactButton = styled.button`
  margin-top: 10px;
  background-color: #10b981;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #059669;
  }
`;

export const SidebarFooter = styled.div`
  text-align: center;
  font-size: 12px;
  color: #718096;
  margin-top: 20px;
`;
