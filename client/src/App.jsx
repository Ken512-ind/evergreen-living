import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import IndoorPlants from "./pages/IndoorPlants";
import HerbalPlants from "./pages/HerbalPlants";
import PlantDetail from "./pages/PlantDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import AdminRoute from "./components/AdminRoute";
import PageWrapper from "./components/PageWrapper";

import Register from "./pages/Register";
import AddPlant from "./pages/AddPlant";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/indoor"
            element={
              <PageWrapper>
                <IndoorPlants />
              </PageWrapper>
            }
          />

          <Route
            path="/herbal"
            element={
              <PageWrapper>
                <HerbalPlants />
              </PageWrapper>
            }
          />

          <Route
            path="/plant/:slug"
            element={
              <PageWrapper>
                <PlantDetail />
              </PageWrapper>
            }
          />

          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />

          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />  

          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              </AdminRoute>
            }
          />

          <Route
            path="/add-plant"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AddPlant />
                </PageWrapper>
              </AdminRoute>
            }
          />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;