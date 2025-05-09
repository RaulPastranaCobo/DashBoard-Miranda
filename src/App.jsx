import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Bookings from "./pages/bookings/Bookings";
import Contact from "./pages/contacts/Contacts";
import Users from "./pages/users/Users";
import Rooms from "./pages/rooms/Rooms";
import Navbar from "./components/NavBar/Navbar";
import LoginPage from "./pages/login/LoginPage";

import { useAuth } from "./context/AuthContext";

import { AppContainer, MainLayout, Content } from "./AppStyle";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <AppContainer>
                <Navbar />
                <MainLayout>
                  <Sidebar />
                  <Content>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/rooms" element={<Rooms />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Content>
                </MainLayout>
              </AppContainer>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
