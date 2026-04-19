import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import IndoorPlants from "./pages/IndoorPlants";
import HerbalPlants from "./pages/HerbalPlants";
import PlantDetail from "./pages/PlantDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import PageTransition from "./components/PageTransition";

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
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/indoor"
            element={
              <PageTransition>
                <IndoorPlants />
              </PageTransition>
            }
          />

          <Route
            path="/herbal"
            element={
              <PageTransition>
                <HerbalPlants />
              </PageTransition>
            }
          />

          <Route
            path="/plant/:slug"
            element={
              <PageTransition>
                <PlantDetail />
              </PageTransition>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <Dashboard />
              </PageTransition>
            }
          />

          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />

        </Routes>

      </AnimatePresence>
    </>
  );
}

export default App;