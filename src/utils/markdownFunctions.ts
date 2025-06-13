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
      alertDiv.innerHTML.length === 0 ? alertDiv.innerHTML = 'Success: Your account has been updated!' : alertDiv.innerHTML = '';
    }
  },

  alertWarning: () => {
    const warningDiv = document.getElementById('favorite-character-error');
    if (warningDiv) {
      warningDiv.innerHTML.length === 0 ? warningDiv.innerHTML = 'Warning: The correct answer is all of them' : warningDiv.innerHTML = '';
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
});
