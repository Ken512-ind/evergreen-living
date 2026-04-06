import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Home from "./pages/Home";
import IndoorPlants from "./pages/IndoorPlants";
import HerbalPlants from "./pages/HerbalPlants";
import PlantDetail from "./pages/PlantDetail";

import PageWrapper from "./components/PageWrapper";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

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

        </Routes>

      </AnimatePresence>

      <Footer />

      <ScrollToTopButton />

    </>
  );
}

export default App;