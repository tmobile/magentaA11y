import { NavigateFunction } from 'react-router-dom';

/**
 * A map of callable functions that can be referenced inside Markdown files rendered as HTML.
 *
 * Markdown content sometimes includes interactive elements like <button data-fn="showAlert">.
 * Since React does not allow inline event handlers like `onclick="..."`, this utility provides
 * a safe way to bind predefined JavaScript functions to those buttons using the `data-fn` attribute.
 *
 * Each key in this map corresponds to a function name that can be used in Markdown:
 *
 * Example Markdown:
 *   <button data-fn="showAlert">Click Me</button>
 *
 * The render logic (usually inside the `ReactMarkdown` component's `components` prop) should
 * look for the `data-fn` attribute and bind the appropriate function from this map to the
 * element's `onClick` handler.
 *
 * ⚠️ Important: All functions included here must be safe to expose and should not depend
 * on runtime context that isn't available when Markdown is rendered.
 */
export const getMarkdownFunctionMap = (
  navigate: NavigateFunction
): Record<string, (event: React.MouseEvent<Element>) => void> => ({
  showAlert: () => alert('This works with a keyboard and a mouse!'),
  showAlertWhenDisabled: () =>
    alert('This disabled button is still actionable for mouse and screen readers users!'),
  showMouseAlert: () => alert('This only works with a mouse'),
  goToHome: () => navigate('/home'),

  toggleAccordionState: (event) => {
    const targetButton = event.currentTarget as HTMLButtonElement;
    const expanded = targetButton.getAttribute('aria-expanded') === 'true';
    targetButton.setAttribute('aria-expanded', String(!expanded));
  },

  scrollToTopOnly: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  scrollToHref: () => {
    const dest = document.getElementById('destination');
    if (dest) {
      dest.focus();
    }
  },

  goToNext: () => {
    const dest = document.getElementById('destination');
    const list = document.querySelector('.slide-list'); // Select the ul element
    const currentSlide = document.querySelector('.visible');

    if (list) {
      const listItems = list.querySelectorAll('li'); // Select all li elements inside the ul
      let currentIndex = Array.from(list.children).findIndex(item => item === currentSlide); // find which index we are at

      listItems[currentIndex].classList.toggle('visible'); // hide first slide

      if (currentIndex < listItems.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; //loop back to the first element, if desired
      }

      listItems[currentIndex].classList.toggle('visible'); // show next slide

      if (dest) {
        dest.focus();
      }

    }
  },

  alertSuccess: () => {
    const alertDiv = document.getElementById('alertSuccessExample');
    if (alertDiv) {
      alertDiv.innerHTML === '' ? alertDiv.innerHTML = '<p class="alert success">Success: Your account has been updated!</p>' : alertDiv.innerHTML = '';
    }
  },

  hintHelpErrorAlertDemo: () => {
    const warningDiv = document.getElementById('hint-help-error-alert');
    if (warningDiv) {
      warningDiv.innerHTML.length === 0 ? warningDiv.innerHTML = '<p class="alert warning">Warning: The correct answer is Cookie Monster!</p>' : warningDiv.innerHTML = '';
    }
  },

  alertWarning: () => {
    const warningDiv = document.getElementById('favorite-character-error');
    if (warningDiv) {
      warningDiv.innerHTML.length === 0 ? warningDiv.innerHTML = '<p class="alert warning">Warning: The correct answer is all of them</p>' : warningDiv.innerHTML = '';
    }
  },

  increaseNumber: () => {
    const stepNumber = document.getElementById('step-number');
    const liveRegion = document.getElementById('stepper-status-target');
    const decreaseButton = document.getElementById('decrement-button');

    if (stepNumber) {
      let currentNumber = parseInt(stepNumber.innerHTML);
      stepNumber.innerHTML = `${currentNumber + 1}`;

      if (decreaseButton) {
        if (currentNumber===1) {
          decreaseButton.removeAttribute('aria-disabled');
        } else if (currentNumber===0) {
          decreaseButton.setAttribute('aria-disabled', 'true');
        }
      }

      if (liveRegion) {
        liveRegion.innerHTML = `Quantity updated, ${currentNumber + 1}`;

        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 2000);
      }
    }
  },

  decreaseNumber: (event) => {
    const stepNumber = document.getElementById('step-number');
    const liveRegion = document.getElementById('stepper-status-target');
    // const decreaseButton = event.currentTarget as HTMLButtonElement;

    if (stepNumber) {
      let currentNumber = parseInt(stepNumber.innerHTML);

      if (currentNumber > 0) {
        stepNumber.innerHTML = `${currentNumber - 1}`;
      }

      // if (decreaseButton) {
      //   if (currentNumber==1) {
      //     decreaseButton.removeAttribute('aria-disabled');
      //   } else if (currentNumber==0) {
      //     decreaseButton.setAttribute('aria-disabled', 'true');
      //   }
      // }

      if (liveRegion) {
        liveRegion.innerHTML = `Quantity updated, ${currentNumber + 1}`;

        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 2000);
      }
    }
  },

  increaseSelectStepper: () => {
    const liveRegion = document.getElementById('stepper-status-target-1');
    const stepperSelect = document.getElementById('stepper') as HTMLSelectElement;

    if (!stepperSelect || stepperSelect.tagName.toLowerCase() !== 'select') {
      return; // Exit if the provided element is not a select element
    }
  
    let currentIndex = stepperSelect.selectedIndex;
    let nextIndex = currentIndex + 1;
  
    if (nextIndex < stepperSelect.options.length) {
      stepperSelect.selectedIndex = nextIndex;

      if (liveRegion) {
        liveRegion.innerHTML = `Quantity updated, ${nextIndex+1}`;
  
        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 2000);
      }
    }
  },

  decreaseSelectStepper: () => {
    const liveRegion = document.getElementById('stepper-status-target-1');
    const stepperSelect = document.getElementById('stepper') as HTMLSelectElement;

    if (!stepperSelect || stepperSelect.tagName.toLowerCase() !== 'select') {
      return; // Exit if the provided element is not a select element
    }
  
    let currentIndex = stepperSelect.selectedIndex;
    let nextIndex = currentIndex - 1;
  
    if (currentIndex===0) {
      return; // do nothing if at 0
    } else if (nextIndex < stepperSelect.options.length) {
      stepperSelect.selectedIndex = nextIndex;

      if (liveRegion) {
        liveRegion.innerHTML = `Quantity updated, ${currentIndex}`;
  
        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 2000);
      }
    }
  },

  scrollAndFocusMain: () => {
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  toggleExpander: (event) => {
    // define variables
    const toggleButton = document.getElementById('expanderToggle');
    const contentToToggle = document.getElementById('expanderContent');

    // check to see if there are any accordions at all
    if (!toggleButton || !contentToToggle) {
      console.warn('Expander elements not found.');
      return;
    }

    // Get current state
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    
    // Toggle the state - use only aria-expanded attribute 
    const newExpandedState = !isExpanded;
          toggleButton.setAttribute('aria-expanded', String(newExpandedState));
    
  },
// show/close modal functionality
  showModal: (event) => {
  const trigger = event?.currentTarget as HTMLElement | null;
  const targetId = trigger?.getAttribute('data-target') || 'modal';
  const dlg = document.getElementById(targetId) as HTMLDialogElement | null;
  if (!dlg) return;

  // Remember where to return focus
  const returnEl = trigger || (document.activeElement as HTMLElement | null);
  if (returnEl) {
    if (!returnEl.id) returnEl.id = `modal-trigger-${Math.random().toString(36).slice(2)}`;
    dlg.setAttribute('data-return-focus', returnEl.id);
  }

  // Ensure ARIA
  if (!dlg.getAttribute('role')) dlg.setAttribute('role', 'dialog');
  if (!dlg.getAttribute('aria-modal')) dlg.setAttribute('aria-modal', 'true');

  // --- Native modal path (preferred)
  if (typeof dlg.showModal === 'function') {
    // clear any legacy inline styles
    dlg.style.removeProperty('display');
    dlg.style.removeProperty('z-index');
    dlg.removeAttribute('open');

    if (!dlg.open) {
      try { dlg.showModal(); } catch { /* already open */ }
    }

    // initial focus
    const preferred = dlg.querySelector<HTMLElement>('[data-initial-focus],[autofocus]') || dlg;
    requestAnimationFrame(() => preferred.focus());

    // restore focus on close (wire once)
    if (!dlg.dataset.restoreFocus) {
      dlg.addEventListener('close', () => {
        const id = dlg.getAttribute('data-return-focus');
        if (id) document.getElementById(id)?.focus();
        dlg.removeAttribute('data-return-focus');
      });
      dlg.dataset.restoreFocus = 'true';
    }

    // click outside to close 
    if (!dlg.dataset.backdropClose) {
      dlg.addEventListener('click', (e) => {
        const r = dlg.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) dlg.close();
      });
      dlg.dataset.backdropClose = 'true';
    }
    return;
  }

  // --- Fallback (non-modal)
  dlg.style.display = 'block';
  dlg.setAttribute('open', '');
  if (!dlg.hasAttribute('tabindex')) dlg.setAttribute('tabindex', '-1');
  dlg.focus();
  },

  closeModal: (event) => {
  const target = event?.currentTarget as HTMLElement | null;

  // Always prefer the real ancestor dialog the button lives in
  let dlg = target?.closest('dialog') as HTMLDialogElement | null;

  // Fallback to an explicit target id, then to 'modal'
  if (!dlg) {
    const id = target?.getAttribute('data-target') || 'modal';
    dlg = document.getElementById(id) as HTMLDialogElement | null;
  }
  if (!dlg) return;

  // Close natively if open; else ensure the fallback state is cleared
  if (dlg.open && typeof dlg.close === 'function') {
    try { dlg.close(); } catch { /* no-op */ }
  } else {
    dlg.removeAttribute('open');
  }

  // Clear any legacy inline visibility used by fallback path
  dlg.style.removeProperty('display');

  // Restore focus to the launcher
  const id = dlg.getAttribute('data-return-focus');
  if (id) document.getElementById(id)?.focus();
  dlg.removeAttribute('data-return-focus');

  // Prevent this click from bubbling into the page during the same tick
  event?.stopPropagation?.();
  event?.preventDefault?.();

  // Safety check (helps catch ghost top-layer dialogs during dev)
  // If something went wrong, this will close any stray open dialogs.
  const stillOpen = document.querySelectorAll('dialog[open]');
  if (stillOpen.length > 0) {
    stillOpen.forEach((d) => {
      try { (d as HTMLDialogElement).close?.(); } catch {}
      (d as HTMLElement).style.removeProperty('display');
      d.removeAttribute('open');
    });
  }
  },

  // Progress indicator loading chip
startProgress: (event) => {
  const btn = event.currentTarget as HTMLButtonElement;
  if (!btn || btn.disabled || btn.dataset.running === '1') return;
  btn.dataset.running = '1';

  const host =
    (btn.closest('#slow-app') as HTMLElement) ||
    (btn.parentElement as HTMLElement) ||
    document.body;

  const chip =
    (host.querySelector('#progress-chip') as HTMLElement) ||
    (document.querySelector('#progress-chip') as HTMLElement) ||
    null;

  const setBusy = (busy: boolean) => {
    host.setAttribute('aria-busy', busy ? 'true' : 'false');
    btn.disabled = busy;
    btn.setAttribute('aria-disabled', busy ? 'true' : 'false');
    if (chip) {
      chip.hidden = !busy;                 // show only while busy
      chip.classList.toggle('is-busy', busy); // pulse while busy
    }
  };

  setBusy(true); // shows + pulses the chip

  const steps = [10, 25, 50, 75];
  const delays = [2000, 2000, 2000]; // ms between updates

  // Kick off first update (chip itself announces via role="status")
  if (chip) {
    chip.removeAttribute('aria-label'); // ensure no leftover custom message
    chip.textContent = '10%';
  }

  let t = 0;
  for (let i = 1; i < steps.length; i++) {
    t += delays[i - 1];
    const pct = steps[i];
    window.setTimeout(() => {
      if (!chip) return;
      chip.textContent = `${pct}%`; // role="status" will announce this change
      // no aria-label during progress (avoid duplicate phrasing)
    }, t);
  }

  // Finish: visually show "Done", but announce "Save complete"
  t += 900;
  window.setTimeout(() => {
    if (chip) {
      chip.classList.remove('is-busy');   // stop pulse
      chip.textContent = 'Done';          // visual
      chip.setAttribute('aria-label', 'Save complete'); // spoken
    }

    // re-enable immediately
    host.setAttribute('aria-busy', 'false');
    btn.disabled = false;
    btn.setAttribute('aria-disabled', 'false');

    // hide after a short linger
    setTimeout(() => {
      if (chip) {
        chip.hidden = true;
        chip.textContent = '0%';          // optional reset for next run
        chip.removeAttribute('aria-label'); // cleanup
      }
      try { btn.focus(); } catch {}
      delete btn.dataset.running;
    }, 2000);
  }, t);
},

});
