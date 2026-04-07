import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollRestore() {
  const location = useLocation();

  useEffect(() => {
    // Ambil posisi scroll yang tersimpan
    const savedPosition =
      sessionStorage.getItem("scrollPosition");

    if (savedPosition) {
      window.scrollTo(
        0,
        parseInt(savedPosition)
      );
    }

    // Simpan posisi scroll saat user scroll
    const handleScroll = () => {
      sessionStorage.setItem(
        "scrollPosition",
        window.scrollY
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [location.pathname]);
}

export default useScrollRestore;