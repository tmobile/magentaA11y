import MarkdownContent from "components/content-display/markdown-content/markdown-content";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "components/custom-components/buttons/button-types";
import Button from "components/custom-components/buttons/button/button";
import Chips from "components/custom-components/chips/chips";
import {
  ChipSize,
  ChipType,
  IChipSelectable,
} from "components/custom-components/chips/chips.types";
import Divider from "components/custom-components/divider/divider";
import { OrientationEnum } from "components/custom-components/divider/divider.types";
import { getFirstOverviewLink } from "components/navigation/top-nav/top-nav";
import { useClipboard } from "hooks/useClipboard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCriteria } from "shared/contexts/criteria-context";
import { Icons } from "shared/Icons";
import { DocumentationCategory } from "shared/types/shared-types";
import { formatTabLabel } from "utils/string-helpers";

import "../my-criteria/my-criteria.scss";

const MyCriteria: React.FC = () => {
  const { savedCriteria, removeCriteria, clearCriteria } = useCriteria();
  const { copiedContent, copyToClipboard } = useClipboard();
  const [selectedTabIndex, setActiveTab] = useState<number>(0);
  const mergedCriteriaTabs = useMemo(() => {
    return ["Condensed", "Gherkin"].map((tabName) => ({
      tab: tabName,
      content: savedCriteria
        .filter((item) => item.tab === tabName)
        .map((item) => item.content.trim())
        .join("\n\n---\n\n"),
    }));
  }, [savedCriteria]);

  useEffect(() => {
    const nonEmptyIndex = mergedCriteriaTabs.findIndex(
      (tab) => tab.content.trim() !== ""
    );
    const emptyCount = mergedCriteriaTabs.filter(
      (tab) => tab.content.trim() === ""
    ).length;

    if (emptyCount === mergedCriteriaTabs.length - 1 && nonEmptyIndex !== -1) {
      setActiveTab(nonEmptyIndex);
    }
  }, [mergedCriteriaTabs]);

  const [deletedChipIndex, setDeletedChipIndex] = useState<number | null>(null);

  const tabsElementRef = useRef<HTMLElement>(null);
  const condensedChipsRef = useRef<HTMLDivElement>(null);
  const gherkinChipsRef = useRef<HTMLDivElement>(null);
  const emptyMessageRef = useRef<HTMLDivElement>(null);

  const currentTabContent = useMemo(() => {
    return mergedCriteriaTabs[selectedTabIndex]?.content || "";
  }, [mergedCriteriaTabs, selectedTabIndex]);

  const currentTabChips: IChipSelectable[] = useMemo(() => {
    return savedCriteria
      .filter((item) => item.tab === mergedCriteriaTabs[selectedTabIndex]?.tab)
      .map((criterion) => ({
        id: criterion.id,
        label: criterion.label,
      }));
  }, [savedCriteria, mergedCriteriaTabs, selectedTabIndex]);

  const focusFirstEmptyStateLink = () => {
    if (emptyMessageRef.current) {
      const firstLink = emptyMessageRef.current.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  };

  const deleteCriteriaChip = (id: string) => {
    const index = currentTabChips.findIndex((chip) => chip.id === id);
    setDeletedChipIndex(index);
    removeCriteria(id);
  };

  const copyCurrentCriteria = (): void => {
    if (!currentTabContent.trim()) return;
    copyToClipboard(currentTabContent);
  };

  const clearCurrentTabCriteria = () => {
    const activeTabLabel = mergedCriteriaTabs[selectedTabIndex]?.tab;
    if (!activeTabLabel) return;

    clearCriteria(activeTabLabel);

    setTimeout(() => {
      focusFirstEmptyStateLink();
    }, 0);
  };

  useEffect(() => {
    if (deletedChipIndex === null) return;

    const updatedChips = currentTabChips;
    const nextFocusIndex = Math.min(deletedChipIndex, updatedChips.length - 1);

    const refToUse =
      selectedTabIndex === 0 ? condensedChipsRef : gherkinChipsRef;

    if (updatedChips.length > 0 && refToUse.current) {
      const chipButtons = refToUse.current.querySelectorAll("button");
      if (chipButtons[nextFocusIndex]) {
        chipButtons[nextFocusIndex].focus();
      }
    } else if (updatedChips.length === 0) {
      focusFirstEmptyStateLink();
    }

    setDeletedChipIndex(null);
  }, [currentTabChips, deletedChipIndex, selectedTabIndex]);

  let criteriaIsCopied =
    copiedContent === mergedCriteriaTabs[selectedTabIndex]?.content;

  return (
    <div className="MagentaA11y__my-criteria">
      <div className="MagentaA11y__my-criteria__heading-wrapper">
        <h1 className="MagentaA11y__my-criteria__heading">My Criteria</h1>
        <p className="MagentaA11y__my-criteria__headline">
          Lorem ipsum about this
        </p>
      </div>
      <Divider orientation={OrientationEnum.HORIZONTAL} />
      <div className="MagentaA11y__my-criteria__actions">
        <div className="MagentaA11y__my-criteria__tab-container">
          <md-tabs
            ref={tabsElementRef}
            aria-label="Criteria options"
            role="tablist"
          >
            {mergedCriteriaTabs.map((tab, index) => {
              const formattedLabel = formatTabLabel(tab.tab);
              return (
                <md-primary-tab
                  key={tab.tab}
                  aria-selected={selectedTabIndex === index ? "true" : "false"}
                  id={`${formattedLabel}-tab`}
                  role="tab"
                  aria-controls={`${formattedLabel}-tabpanel`}
                  onClick={() => setActiveTab(index)}
                  {...(selectedTabIndex === index ? { active: true } : {})}
                >
                  {tab.tab}
                </md-primary-tab>
              );
            })}
          </md-tabs>

          {currentTabChips.length > 0 && (
            <Button
              onClick={copyCurrentCriteria}
              type={ButtonType.button}
              variant={ButtonVariant.primary}
              size={ButtonSize.large}
              label={criteriaIsCopied ? "Copied!" : "Copy Criteria"}
              decoration={criteriaIsCopied ? Icons.checkmark : Icons.copyFilled}
              id="copy-criteria"
            />
          )}
        </div>
      </div>

      {mergedCriteriaTabs.map((criteria, index) => {
        const formattedLabel = formatTabLabel(criteria.tab);
        const isCondensed = criteria.tab === "Condensed";

        return (
          <div
            key={formattedLabel}
            role="tabpanel"
            id={`${formattedLabel}-tabpanel`}
            aria-labelledby={`${formattedLabel}-tab`}
            className={
              selectedTabIndex === index
                ? "MagentaA11y__my-criteria__criteria-list"
                : "hidden"
            }
          >
            <Chips
              variant={ChipType.BUTTON}
              chips={currentTabChips}
              onDelete={deleteCriteriaChip}
              size={ChipSize.SMALL}
              legend="Saved Criteria"
              ref={isCondensed ? condensedChipsRef : gherkinChipsRef}
            />
            {criteria.content ? (
              <>
                <Button
                  onClick={clearCurrentTabCriteria}
                  type={ButtonType.button}
                  variant={ButtonVariant.tertiary}
                  size={ButtonSize.large}
                  label={`Remove All (${currentTabChips.length})`}
                  id="clear-all-btn"
                />
                <Divider orientation={OrientationEnum.HORIZONTAL} />
                <MarkdownContent content={criteria.content} />
              </>
            ) : (
              <div
                className="MagentaA11y__my-criteria--empty"
                ref={emptyMessageRef}
              >
                <p>
                  It seems you haven’t saved any criteria. Start by checking out{" "}
                  <Link
                    to={`${getFirstOverviewLink(DocumentationCategory.WEB)}`}
                  >
                    Web Criteria
                  </Link>{" "}
                  or{" "}
                  <Link
                    to={`${getFirstOverviewLink(DocumentationCategory.NATIVE)}`}
                  >
                    Native App Criteria
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyCriteria;
