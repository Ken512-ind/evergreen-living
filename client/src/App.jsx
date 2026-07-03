import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import PageWrapper from "./components/PageWrapper";

import Home from "./pages/Home";
import IndoorPlants from "./pages/IndoorPlants";
import HerbalPlants from "./pages/HerbalPlants";
import PlantDetail from "./pages/PlantDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddPlant from "./pages/AddPlant";
import EditPlant from "./pages/EditPlant";
import NotFound from "./pages/NotFound";


import AdminRoute from "./routes/AdminRoute";

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
          
          <Route
            path="/edit-plant/:id"
            element={
              <AdminRoute>
                <PageWrapper>
                  <EditPlant />
                </PageWrapper>
              </AdminRoute>
            }
          />

          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
            borderRadius: "12px",
            background: "#1f2937",
            color: "#fff",
        },
      }}
    />

  </>
  );
}

export default App;