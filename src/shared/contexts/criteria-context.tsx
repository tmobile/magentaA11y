import {
  ContentTab,
  SavedCriteria,
} from 'components/content-display/markdown-content/markdown-content.types';
import React, { createContext, ReactNode, useContext } from 'react';

const LOCAL_STORAGE_KEY: string = 'savedCriteria';

interface CriteriaContextType {
  savedCriteria: SavedCriteria[];
  saveCriteria: (criteria: SavedCriteria) => void;
  removeCriteria: (id: string) => void;
  clearCriteria: (label: string) => void;
}

const CriteriaContext = createContext<CriteriaContextType | undefined>(
  undefined
);

const saveToLocalStorage = (criteria: SavedCriteria[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(criteria));
  } catch (error) {
    console.error('Failed to save criteria to localStorage:', error);
  }
};

const getInitialSavedCriteria = (): SavedCriteria[] => {
  try {
    const storedCriteria = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedCriteria ? JSON.parse(storedCriteria) : [];
  } catch (error) {
    console.error('Failed to load criteria from localStorage:', error);
    return [];
  }
};

const useSavedCriteria = () => {
  const [savedCriteria, setSavedCriteria] = React.useState<SavedCriteria[]>(
    getInitialSavedCriteria
  );

  const saveCriteria = React.useCallback((criteria: SavedCriteria) => {
    setSavedCriteria((prev) => {
      if (
        !prev.some(
          (item) =>
            item.label === criteria.label && item.content === criteria.content
        )
      ) {
        const updatedCriteria = [...prev, criteria];
        saveToLocalStorage(updatedCriteria);
        return updatedCriteria;
      }
      return prev;
    });
  }, []);

  const removeCriteria = React.useCallback((id: string) => {
    setSavedCriteria((prev) => {
      const updatedCriteria = prev.filter((item) => item.id !== id);
      saveToLocalStorage(updatedCriteria);
      return updatedCriteria;
    });
  }, []);

  const clearCriteria = React.useCallback((criteria: string) => {
    setSavedCriteria((prev) => {
      const updatedCriteria = prev.filter(
        (item: ContentTab) => item.tab !== criteria
      );
      saveToLocalStorage(updatedCriteria);
      return updatedCriteria;
    });
  }, []);

  return {
    savedCriteria,
    saveCriteria,
    removeCriteria,
    clearCriteria,
  };
};

export const CriteriaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const criteria = useSavedCriteria();

  return (
    <CriteriaContext.Provider value={criteria}>
      {children}
    </CriteriaContext.Provider>
  );
};

export const useCriteria = () => {
  const context = useContext(CriteriaContext);
  if (!context) {
    throw new Error('useCriteria must be used within a CriteriaProvider');
  }
  return context;
};
