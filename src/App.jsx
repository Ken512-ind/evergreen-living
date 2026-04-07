import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ErrorBoundary from "./components/ErrorBoundary";
import PageWrapper from "./components/PageWrapper";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import {
  lazy,
  Suspense,
} from "react";

import useScrollRestore from "./hooks/useScrollRestore";

/* Lazy load pages */

const Home = lazy(() =>
  import("./pages/Home")
);

const IndoorPlants = lazy(() =>
  import("./pages/IndoorPlants")
);

const HerbalPlants = lazy(() =>
  import("./pages/HerbalPlants")
);

const PlantDetail = lazy(() =>
  import("./pages/PlantDetail")
);

const NotFound = lazy(() =>
  import("./pages/NotFound")
);

function App() {
  useScrollRestore();

  const location = useLocation();

  return (
    <ErrorBoundary>

      <Navbar />

      <main className="min-h-screen">

        {/* Loading fallback */}

        <Suspense
          fallback={
            <div className="
              min-h-screen
              flex
              items-center
              justify-center
            ">
              <p className="text-gray-500">
                Loading...
              </p>
            </div>
          }
        >

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

              {/* 404 */}

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

        </Suspense>

      </main>

      <Footer />

      <ScrollToTopButton />

    </ErrorBoundary>
  );
}

export default App;