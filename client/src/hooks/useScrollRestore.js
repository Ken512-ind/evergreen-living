import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollRestore() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}

export default useScrollRestore;