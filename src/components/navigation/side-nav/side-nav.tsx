import IconButton from "components/custom-components/buttons/icon-button/icon-button";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icons } from "shared/Icons";
import { DocumentationCategory } from "shared/types/shared-types";
import { isPathActive } from "utils/navigation-helpers";
import contentData from "../../../shared/content.json";
import { useViewport } from "../../../shared/contexts/viewport-context";
import Accordion from "../../custom-components/accordion/accordion";

import "./side-nav.scss";

interface NavItem {
  label: string;
  name: string;
  type?: "file";
  children?: NavItem[];
}

interface SideNavProps {
  documentation: DocumentationCategory;
  testId?: string;
}

const SideNav = forwardRef(({ documentation, testId }: SideNavProps, ref) => {
  const viewportContext = useViewport();
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => {
      dialogRef.current?.showModal();
      closeButtonRef.current?.focus();
    },
    closeModal: () => {
      dialogRef.current?.close();
    },
  }));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target === dialog) {
          dialog.close();
        }
      };
      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, []);

  const renderNavItems = (
    items: NavItem[],
    parentPath = `/${documentation}-criteria`
  ) => (
    <div className="MagentaA11y__side-nav-container" data-testid={testId}>
      <div className="MagentaA11y__side-nav">
        <div className="MagentaA11y__side-nav--title-wrapper">
          <h2 className="MagentaA11y__side-nav--title" id="side-nav-title">
            {documentation === DocumentationCategory.HOW_TO_TEST
              ? "Websites"
              : "Criteria"}
          </h2>
          {viewportContext.isMobile && (
            <IconButton
              a11yLabel="close"
              icon={Icons.closeOutlined}
              onClick={() => dialogRef.current?.close()}
              id="close-side-nav-btn"
              ref={closeButtonRef}
            />
          )}
        </div>
        <ul className="MagentaA11y__side-nav--list">
          {items.map((item) => {
            const fullPath = `${parentPath}/${item.name}`;
            const itemActive = isPathActive(fullPath, location);

            return (
              <li key={item.name} className="MagentaA11y__side-nav--item">
                <Accordion
                  title={item.label}
                  id={`${item.name}-list`}
                  isOpened={itemActive}
                >
                  {item.children && item.children.length > 0 ? (
                    <ul className="MagentaA11y__side-nav--sub-list">
                      <li
                        key={`${item.name} overview`}
                        className="MagentaA11y__side-nav--sub-item"
                      >
                        <NavLink
                          to={`${fullPath}/overview`}
                          className="MagentaA11y__side-nav--link"
                          onClick={() => dialogRef.current?.close()}
                        >
                          Overview
                        </NavLink>
                      </li>
                      {item.children.map((child) => (
                        <li
                          key={child.name}
                          className="MagentaA11y__side-nav--sub-item"
                        >
                          <NavLink
                            to={`${fullPath}/${child.name}`}
                            className="MagentaA11y__side-nav--link"
                            onClick={() => dialogRef.current?.close()}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <a href={fullPath}>{item.label}</a>
                  )}
                </Accordion>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  if (viewportContext.isMobile) {
    return (
      <dialog
        ref={dialogRef}
        id="side-nav-dialog"
        aria-modal="true"
        aria-labelledby="side-nav-title"
        data-testid={testId ? `${testId}-dialog` : undefined}
      >
        {renderNavItems(contentData[documentation] as NavItem[])}
      </dialog>
    );
  }

  return renderNavItems(contentData[documentation] as NavItem[]);
});

export default SideNav;
