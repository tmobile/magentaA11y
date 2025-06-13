import { useLocation } from 'react-router-dom';
import { useCriteria } from 'shared/contexts/criteria-context';
import { ContentTab } from 'components/content-display/markdown-content/markdown-content.types';

export const useCriteriaManager = (tabs: ContentTab[], activeTab: number) => {
  const location = useLocation();
  const { savedCriteria, saveCriteria, removeCriteria } = useCriteria();

  const handleToggleCriteria = () => {
    if (!tabs[activeTab]) return;

    const componentName = location.pathname.split('/').slice(-1)[0];
    const criteriaId = `${componentName}-${tabs[
      activeTab
    ].label.toLowerCase()}`;

    const isAlreadySaved = savedCriteria.some((item) => item.id === criteriaId);
    if (isAlreadySaved) {
      removeCriteria(criteriaId);
    } else {
      saveCriteria({
        id: criteriaId,
        label: componentName,
        content: tabs[activeTab].content,
        tab: tabs[activeTab].label,
        savedAt: new Date(),
      });
    }
  };

  const isCriteriaSaved = savedCriteria.some(
    (item) =>
      item.id ===
      `${location.pathname.split('/').slice(-1)[0]}-${tabs[
        activeTab
      ]?.label.toLowerCase()}`
  );

  return { handleToggleCriteria, isCriteriaSaved };
};
