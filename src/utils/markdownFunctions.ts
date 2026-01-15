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
  /**
   * Shows a generic alert.
   */
  showAlert: () => alert('This works with a keyboard and a mouse!'),

  /**
   * Shows an alert indicating the button is actionable despite being disabled.
   */
  showAlertWhenDisabled: () =>
    alert('This disabled button is still actionable for mouse and screen readers users!'),

  /**
   * Shows an alert that only works with mouse clicks.
   */
  showMouseAlert: () => alert('This only works with a mouse'),

  /**
   * Navigates to the home page.
   */
  goToHome: () => navigate('/home'),

  /**
   * Toggles the aria-expanded state of an accordion button.
   */
  toggleAccordionState: (event) => {
    const targetButton = event.currentTarget as HTMLButtonElement;
    const expanded = targetButton.getAttribute('aria-expanded') === 'true';
    targetButton.setAttribute('aria-expanded', String(!expanded));
  },

  /**
   * Smoothly scrolls to the top of the window.
   */
  scrollToTopOnly: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Scrolls to and focuses the element with ID 'destination'.
   */
  scrollToHref: () => {
    const dest = document.getElementById('destination');
    if (dest) {
      dest.focus();
    }
  },

  /**
   * Cycles through list items in a slide-list, showing the next one and focusing the destination.
   */
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

  /**
   * Toggles a success alert message in the 'alertSuccessExample' div.
   */
  alertSuccess: () => {
    const alertDiv = document.getElementById('alertSuccessExample');
    if (alertDiv) {
      alertDiv.innerHTML === '' ? alertDiv.innerHTML = '<p class="alert success">Success: Your account has been updated!</p>' : alertDiv.innerHTML = '';
    }
  },

  /**
   * Toggles a warning alert message in the 'hint-help-error-alert' div.
   */
  hintHelpErrorAlertDemo: () => {
    const warningDiv = document.getElementById('hint-help-error-alert');
    if (warningDiv) {
      warningDiv.innerHTML.length === 0 ? warningDiv.innerHTML = '<p class="alert warning">Warning: The correct answer is Cookie Monster!</p>' : warningDiv.innerHTML = '';
    }
  },

  /**
   * Toggles a warning alert message in the 'favorite-character-error' div.
   */
  alertWarning: () => {
    const warningDiv = document.getElementById('favorite-character-error');
    if (warningDiv) {
      warningDiv.innerHTML.length === 0 ? warningDiv.innerHTML = '<p class="alert warning">Warning: The correct answer is all of them</p>' : warningDiv.innerHTML = '';
    }
  },

  /**
   * Increases a number in a stepper component, updating live regions and button states.
   */
  increaseNumber: (event) => {
    const stepNumber = document.getElementById('step-number');
    const liveRegion = document.getElementById('stepper-status-target');
    const increaseButton = event.currentTarget as HTMLButtonElement;
    const stepper = increaseButton.closest('.stepper');
    const decreaseButton = stepper?.querySelector('[data-fn="decreaseNumber"]') as HTMLButtonElement;

    if (stepNumber) {
      let currentNumber = parseInt(stepNumber.innerHTML);
      
      if (currentNumber < 11) {
        let newNumber = currentNumber + 1;
        stepNumber.innerHTML = `${newNumber}`;

        if (decreaseButton) {
          if (newNumber > 1) {
            decreaseButton.removeAttribute('aria-disabled');
          }
        }

        if (increaseButton) {
          if (newNumber === 11) {
            increaseButton.setAttribute('aria-disabled', 'true');
          }
        }

        if (liveRegion) {
          liveRegion.innerHTML = `Quantity updated, ${newNumber}`;

          setTimeout(() => {
            liveRegion.innerHTML = '';
          }, 2000);
        }
      }
    }
  },

  /**
   * Decreases a number in a stepper component, updating live regions and button states.
   */
  decreaseNumber: (event) => {
    const stepNumber = document.getElementById('step-number');
    const liveRegion = document.getElementById('stepper-status-target');
    const decreaseButton = event.currentTarget as HTMLButtonElement;
    const stepper = decreaseButton.closest('.stepper');
    const increaseButton = stepper?.querySelector('[data-fn="increaseNumber"]') as HTMLButtonElement;

    if (stepNumber) {
      let currentNumber = parseInt(stepNumber.innerHTML);

      if (currentNumber > 1) {
        let newNumber = currentNumber - 1;
        stepNumber.innerHTML = `${newNumber}`;

        if (decreaseButton) {
          if (newNumber === 1) {
            decreaseButton.setAttribute('aria-disabled', 'true');
          }
        }

        if (increaseButton) {
          if (newNumber < 11) {
            increaseButton.removeAttribute('aria-disabled');
          }
        }

        if (liveRegion) {
          liveRegion.innerHTML = `Quantity updated, ${newNumber}`;

          setTimeout(() => {
            liveRegion.innerHTML = '';
          }, 2000);
        }
      }
    }
  },

  /**
   * Increases the selection in a select stepper, updating live regions and button states.
   */
  increaseSelectStepper: (event) => {
    const liveRegion = document.getElementById('stepper-status-target-1');
    const stepperSelect = document.getElementById('stepper') as HTMLSelectElement;
    const increaseButton = event.currentTarget as HTMLButtonElement;
    const stepper = increaseButton.closest('.stepper');
    const decreaseButton = stepper?.querySelector('[data-fn="decreaseSelectStepper"]') as HTMLButtonElement;

    if (!stepperSelect || stepperSelect.tagName.toLowerCase() !== 'select') {
      return; // Exit if the provided element is not a select element
    }

    let currentIndex = stepperSelect.selectedIndex;
    let nextIndex = currentIndex + 1;

    if (nextIndex < stepperSelect.options.length) {
      stepperSelect.selectedIndex = nextIndex;

      if (decreaseButton) {
        if (nextIndex > 0) {
          decreaseButton.removeAttribute('aria-disabled');
        }
      }

      if (increaseButton) {
        if (nextIndex === 10) {
          increaseButton.setAttribute('aria-disabled', 'true');
        }
      }

      if (liveRegion) {
        liveRegion.innerHTML = `Quantity updated, ${nextIndex+1}`;

        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 2000);
      }
    }
  },

  /**
   * Decreases the selection in a select stepper, updating live regions and button states.
   */
  decreaseSelectStepper: (event) => {
    const liveRegion = document.getElementById('stepper-status-target-1');
    const stepperSelect = document.getElementById('stepper') as HTMLSelectElement;
    const decreaseButton = event.currentTarget as HTMLButtonElement;
    const stepper = decreaseButton.closest('.stepper');
    const increaseButton = stepper?.querySelector('[data-fn="increaseSelectStepper"]') as HTMLButtonElement;

    if (!stepperSelect || stepperSelect.tagName.toLowerCase() !== 'select') {
      return; // Exit if the provided element is not a select element
    }

    let currentIndex = stepperSelect.selectedIndex;
    let nextIndex = currentIndex - 1;

    if (currentIndex===0) {
      return; // do nothing if at 0
    } else if (nextIndex >= 0) {
      stepperSelect.selectedIndex = nextIndex;

      if (decreaseButton) {
        if (nextIndex === 0) {
          decreaseButton.setAttribute('aria-disabled', 'true');
        }
      }

      if (increaseButton) {
        if (nextIndex < 10) {
          increaseButton.removeAttribute('aria-disabled');
        }
      }

      if (liveRegion) {
        liveRegion.innerHTML = `Quantity updated, ${currentIndex}`;

        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 2000);
      }
    }
  },

  /**
   * Scrolls to and focuses the main element.
   */
  scrollAndFocusMain: () => {
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Toggles the visibility and aria-expanded state of an expander component.
   */
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


  /**
   * Opens a toast message after a delay.
   */
  openToast: ()=> {
    const toast = document.getElementById('hint-spam');

    /* setTimeout is to simulate a delay in the toast opening */
    setTimeout(() => {
      if(toast){
        toast.classList.toggle('inert');
        toast.classList.toggle('enabled');
      }
    }, 500)
  }, 

  // two password input examples
  // first password show/hide example
  /**
   * Toggles the visibility of a password input based on checkbox state.
   */
  togglePasswordVisibility: (event: React.MouseEvent<Element>) => {
    // 1. The checkbox is the currentTarget
    const checkbox = event.currentTarget as HTMLInputElement;
    
    // 2. Find the container relative to this checkbox
    const container = checkbox.closest('.js-password-group') as HTMLElement;
    
    if (container) {
      // 3. Find the specific input in this group
      const passwordInput = container.querySelector('.js-password-input') as HTMLInputElement;
      
      if (passwordInput) {
        // 4. Toggle the type based on whether the checkbox is checked
        passwordInput.type = checkbox.checked ? 'text' : 'password';
      }
    }
  },

  // second password show/hide example
  /**
   * Toggles the visibility of a password input using a button, including updating its pressed state and live region.
   */
  togglePasswordButton: (event: React.MouseEvent<Element>) => {
  const button = event.currentTarget as HTMLButtonElement;
  const container = button.closest('.js-password-group') as HTMLElement;
  const liveRegion = container?.querySelector('#password-state-status');
  
  if (container) {
    const passwordInput = container.querySelector('.js-password-input') as HTMLInputElement;
    
    // 1. Check current state via the data attribute on the container
    const isCurrentlyShowing = container.getAttribute('data-show-password') === 'true';
    const newState = !isCurrentlyShowing;

    if (passwordInput) {
      // 2. Toggle Input Type
      passwordInput.type = newState ? 'text' : 'password';
      
      // 3. Update Data Attribute (for CSS to toggle icons)
      container.setAttribute('data-show-password', String(newState));
      
      // 4. Update Button Aria-Label for Accessibility
      button.setAttribute('aria-label', newState ? 'Hide password' : 'Show password');

      // 5. Update Live Region for Screen Readers
      if (liveRegion) {
        liveRegion.innerHTML = newState ? 'Password shown.' : 'Password hidden.';
        
        // Clear it after a delay so it's ready for the next toggle
        setTimeout(() => {
          liveRegion.innerHTML = '';
        }, 1000);
      }
    }
  }
},
});
