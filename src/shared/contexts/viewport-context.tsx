import { createContext, useContext, useEffect, useState } from "react";

interface ViewportContextProps {
  isMobile: boolean;
  isLargeTablet: boolean;
}

const ViewportContext = createContext<ViewportContextProps | undefined>(
  undefined
);

export const ViewportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeTablet, setIsLargeTablet] = useState(false);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
    const tabletMediaQuery = window.matchMedia("(max-width: 936px)");

    setIsMobile(mobileMediaQuery.matches);
    setIsLargeTablet(tabletMediaQuery.matches);

    const handleMobileResize = () => setIsMobile(mobileMediaQuery.matches);
    const handleTableteResize = () => setIsLargeTablet(tabletMediaQuery.matches);
    mobileMediaQuery.addEventListener("change", handleMobileResize);
    tabletMediaQuery.addEventListener("change", handleTableteResize);

    return () => {
      mobileMediaQuery.removeEventListener("change", handleMobileResize);
      tabletMediaQuery.removeEventListener("change", handleTableteResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile, isLargeTablet }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = (): ViewportContextProps => {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
};
