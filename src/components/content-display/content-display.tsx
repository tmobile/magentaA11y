import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "components/custom-components/buttons/button-types";
import Button from "components/custom-components/buttons/button/button";
import { useClipboard } from "hooks/useClipboard";
import { useContentTabs } from "hooks/useContentTabs";
import { useCriteriaManager } from "hooks/useCriteriaManager";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Icons } from "shared/Icons";
import { DocumentationCategory } from "shared/types/shared-types";
import { formatTabLabel } from "utils/string-helpers";
import Cards from "../custom-components/cards/cards";
import { SideNavItem } from "../navigation/nav.types";
import MarkdownContent from "./markdown-content/markdown-content";
import { Criteria } from "./markdown-content/markdown-content.types";

import "../../styles/_code-blocks.scss";
import "./content-display.scss";

interface ContentDisplayProps {
  documentation: DocumentationCategory;
  items: SideNavItem[];
  onToggleSideNav: () => void;
}

const ASSET_BASE_PATH = "/MagentaA11yV2/content/assets";

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  documentation,
  items,
  onToggleSideNav,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef<HTMLElement>(null);
  const { tabs, activeTab, setActiveTab, currentItem } = useContentTabs(
    items,
    documentation
  );
  const { copiedContent, copyToClipboard } = useClipboard();

  const { handleToggleCriteria, isCriteriaSaved } = useCriteriaManager(
    tabs,
    activeTab
  );

  useEffect(() => {
    if (!tabs.length) return;

    const tabFromURL = searchParams.get("tab");
    if (tabFromURL) {
      const tabIndex = parseInt(tabFromURL, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(tabIndex);
      }
    } else {
      setActiveTab(0);
    }
  }, [searchParams, setActiveTab, tabs.length]);

  useEffect(() => {
    const tabFromURL = searchParams.get("tab");
    if (tabFromURL) {
      const tabIndex = parseInt(tabFromURL, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(tabIndex);
      }
    } else {
      setActiveTab(0);
    }
  }, [searchParams, setActiveTab, tabs.length]);

  // Track active tab changes
  useEffect(() => {
    const handleTabChange = (event: Event) => {
      const tabIndex = (
        event.target as HTMLElement & { activeTabIndex: number }
      ).activeTabIndex;
      setActiveTab(tabIndex);
      navigate({
        pathname: location.pathname,
        search: `?tab=${tabIndex}`,
      });
    };

    const tabsElement = tabsRef.current;

    if (tabsElement) {
      tabsElement.addEventListener("change", handleTabChange);
    }
    return () => {
      if (tabsElement) {
        tabsElement.removeEventListener("change", handleTabChange);
      }
    };
  });

  if (!currentItem) return <div>No content available</div>;

  const { label, generalNotes, children } = currentItem;

  let actionsButtonsVisible = Object.values(Criteria).some(
    (criteria) => criteria === tabs[activeTab]?.label
  );

  let criteriaIsCopied = copiedContent === tabs[activeTab]?.content;
  const isOverviewRoute = location.pathname.endsWith("/overview");

  return (
    <div className="MagentaA11y__nav-display">
      <div className="MagentaA11y__nav-display__intro">
        <h1 className="MagentaA11y__nav-display__title">{label}</h1>

        {generalNotes && !isOverviewRoute && (
          <h2 className="MagentaA11y__nav-display__subtitle">{generalNotes}</h2>
        )}

        <Button
          onClick={onToggleSideNav}
          type={ButtonType.button}
          variant={ButtonVariant.secondary}
          size={ButtonSize.large}
          label={"Criteria"}
          decoration={Icons.listOutlined}
          id="criteria-button"
        ></Button>
      </div>

      {isOverviewRoute && children && children.length > 0 && (
        <Cards
          items={children.map((child) => ({
            title: child.label,
            description: child.generalNotes || undefined,
            link: `${location.pathname.replace(/\/overview$/, "")}/${
              child.name
            }`,
          }))}
        />
      )}

      {!isOverviewRoute && tabs.length > 0 && (
        <div className="MagentaA11y__nav-display__content">
          <div className="MagentaA11y__nav-display__content-actions">
            {/* Tabs */}
            {tabs.length > 1 && (
              <md-tabs
                ref={tabsRef}
                aria-label="Criteria options"
                role="tablist"
              >
                {tabs.map((tab, index) => {
                  const formattedLabel = formatTabLabel(tab.label);

                  return (
                    <md-primary-tab
                      key={tab.label}
                      aria-selected={activeTab === index ? "true" : "false"}
                      aria-controls={`${formattedLabel}-tabpanel`}
                      id={`${formattedLabel}-tab`}
                      role="tab"
                      {...(activeTab === index && { active: true })}
                    >
                      {tab.label}
                    </md-primary-tab>
                  );
                })}
              </md-tabs>
            )}
            {actionsButtonsVisible && (
              <div className="MagentaA11y__nav-display__content-actions__buttons">
                <Button
                  onClick={() => copyToClipboard(tabs[activeTab].content || "")}
                  type={ButtonType.button}
                  variant={ButtonVariant.primary}
                  size={ButtonSize.large}
                  label={criteriaIsCopied ? "Copied!" : "Copy Criteria"}
                  decoration={
                    criteriaIsCopied ? Icons.checkmark : Icons.copyFilled
                  }
                />
                <Button
                  onClick={handleToggleCriteria}
                  type={ButtonType.button}
                  variant={ButtonVariant.tertiary}
                  size={ButtonSize.large}
                  label={isCriteriaSaved ? "Remove Criteria" : "Save Criteria"}
                  decoration={
                    isCriteriaSaved
                      ? Icons.trashcanFilled
                      : Icons.bookmarkFilled
                  }
                />
              </div>
            )}
          </div>
          {tabs.map((tab, index) => {
            const formattedLabel = formatTabLabel(tab.label);
            const tabPanelProps =
              tabs.length > 1
                ? {
                    role: "tabpanel",
                    "aria-labelledby": `${formattedLabel}-tab`,
                  }
                : {};

            return (
              <div
                id={`${formattedLabel}-tabpanel`}
                key={index}
                className={index !== activeTab ? "hidden" : undefined}
                {...tabPanelProps}
              >
                <MarkdownContent
                  key={index}
                  content={tab.content}
                  activeTab={activeTab}
                  assetBasePath={ASSET_BASE_PATH}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
