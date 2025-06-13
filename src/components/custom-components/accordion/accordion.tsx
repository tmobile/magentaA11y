import React, { useEffect, useState } from "react";
import "./accordion.scss";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  id: string;
  isOpened: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  id,
  isOpened,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(isOpened);

  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened]);

  const toggleAccordion = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="MagentaA11y-accordion">
      <h3 className="MagentaA11y-accordion__heading">
        <button
          type="button"
          className="MagentaA11y-accordion__headline"
          aria-expanded={isOpen}
          onClick={toggleAccordion}
        >
          <span className="MagentaA11y-accordion__headline--text">{title}</span>
        </button>
      </h3>
      {isOpen && (
        <div className="MagentaA11y-accordion__body">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
