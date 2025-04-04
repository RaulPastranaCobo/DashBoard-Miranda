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
import Rooms from "./pages/Rooms";
import Navbar from "./components/NavBar/Navbar";
import LoginPage from "./pages/LoginPage";
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

        {isAuthenticated ? (
          <Route
            path="/*"
            element={
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
                    </Routes>
                  </Content>
                </MainLayout>
              </AppContainer>
            }
          />
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
