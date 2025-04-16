import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import Users from "./pages/users";
import Rooms from "./pages/rooms/Rooms";
import Navbar from "./components/NavBar/Navbar";
import LoginPage from "./pages/LoginPage";

import { useAuth } from "./context/AuthContext";

import { AppContainer, MainLayout, Content } from "./AppStyle";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta de Login, redirige a / si ya está autenticado */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />

        {/* Rutas protegidas: redirige a /login si no está autenticado */}
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
              // Si no está autenticado, redirige a /login
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
