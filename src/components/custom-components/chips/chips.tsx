import React, { forwardRef } from 'react';
import { closeOutlined } from 'shared/icons-svg-exports';
import { IChipGroup, IChipSelectable } from './chips.types';

import './chips.scss';

const Chips = forwardRef<HTMLDivElement, IChipGroup>(
  ({ variant, chips, legend, name, size, onSelect, onDelete }, ref) => {
    return (
      <div className="MagentaA11y-chips" data-size={size} ref={ref}>
        {chips.length > 0 && (
          <fieldset>
            {legend && (
              <legend className="MagentaA11y-chips__legend">{legend}</legend>
            )}
            {chips.map((chip: IChipSelectable) => (
              <div key={chip.id} className="MagentaA11y-chip-container">
                <button
                  aria-label={`remove ${chip.label} criteria`}
                  id={chip.id}
                  onClick={() => onDelete(chip.id)}>
                  <span className="MagentaA11y-chip">
                    <span className="MagentaA11y-chip__label--wrapper">
                      <span className="MagentaA11y-chip__label">
                        <span className="MagentaA11y-chip__label--text">
                          {chip.label}
                        </span>
                        {closeOutlined({})}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            ))}
          </fieldset>
        )}
      </div>
    );
  }
);

// Set display name for debugging
Chips.displayName = 'Chips';

export default Chips;
