import React, { MutableRefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import "./skip-link.scss";

interface SkipLinkProps {
  mainContentRef: MutableRefObject<HTMLDivElement | null>;
  liveRegionTestId?: string;
}

const SkipLink: React.FC<SkipLinkProps> = ({
  mainContentRef,
  liveRegionTestId,
}) => {
  const location = useLocation();
  const atomicHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const skipLinkRef = useRef<HTMLButtonElement | null>(null);

  const formatNavigationMessage = () => {
    const pathSegments = location.pathname.trim().split("/").filter(Boolean);

    if (pathSegments.length === 0) return "";

    const [category, component, section] = pathSegments;

    const formattedComponent = component?.replace(/-/g, " ") || "";
    const formattedSection = section ? `${section} ` : "";

    return `Navigated to: ${category}${
      formattedComponent
        ? ` "${formattedComponent} ${formattedSection}page"`
        : " page"
    }`.trim();
  };

  useEffect(() => {
    atomicHeadingRef.current?.focus();
  }, [location.pathname]);

  return (
    <>
      <h2
        id="atomic-region"
        data-testid={liveRegionTestId}
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        ref={atomicHeadingRef}
        className="hidden-visually"
      >
        {formatNavigationMessage()}
      </h2>
      <button
        className="skip-link"
        ref={skipLinkRef}
        onClick={() => {
          mainContentRef.current?.focus();
        }}
      >
        Skip to main content
      </button>
    </>
  );
};

export default SkipLink;
