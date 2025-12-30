/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import './../accessible-demo/accessible-demo.scss';
import './inaccessible-demo.scss';

// Define the radio button options
const screenReaderOptions = [
  { id: 'alphaRadio', value: 'VoiceOver for iOS', label: 'VoiceOver for iOS' },
  { id: 'bravoRadio', value: 'Talkback for Android', label: 'Talkback for Android' },
  { id: 'charlieRadio', value: 'NVDA for Windows', label: 'NVDA for Windows' },
  { id: 'deltaRadio', value: 'JAWS for Windows', label: 'JAWS for Windows' },
  { id: 'echoRadio', value: 'VoiceOver for MacOS', label: 'VoiceOver for MacOS' },
];

type ScreenReaderValue = typeof screenReaderOptions[number]['value'] | '';


const InaccessibleDemo: React.FC = () => {
  // 1. State for the selected "radio button" value
  const [selectedReader, setSelectedReader] = useState<ScreenReaderValue>('');
  
  // 2. State for controlling only the error message visibility and content
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handler to update state when a "radio" div is clicked
  const handleRadioClick = (value: ScreenReaderValue) => {
    setSelectedReader(value);
    
    // Clear the error message immediately upon making a selection
    if (errorMessage) {
        setErrorMessage('');
    }
  };

  // Handler for the submit button click
  const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    
    if (selectedReader) {
      // 1. Clear any lingering error message.
      setErrorMessage('');
      
    } else {
      // ERROR CASE: No selection made.
      setErrorMessage(
        '<p class="error">Please select your favorite screen reader.</p>'
      );
    }
  };


  return (
    <>
    <div className="flex-col">
        <div className="hero">
            <div className="">
                <div className="flex-row">
                    <div>
                        <div className="h-alpha">Inaccessible web page demo</div>
                        <p className="MagentaA11y__nav-display__subtitle">This inaccessible web page demonstrates how a page can work perfectly for someone using a mouse, but still be completely inaccessible. </p>
                    </div>

                    <div className="">
                        <div className="h-delta">We want to know your favorite screen reader.</div>
                        <a tabIndex={-1} href="#favorites" className="Magentaa11y-button Magentaa11y-button--primary">Click here</a>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div className="container">
                    <div className="h-bravo text-center">Broad categories of disabilities</div>
                        <div className="section flex-row">
                            <div className="">
                                <div className="h-delta text-center">
                                    <img src="../../content/assets/media/images/icons/icon-pointer.svg" alt="/assets/images/icons/icon-pointer.svg" className="icon icon-large" role="img" />Motor
                                </div>

                                <p>Not everyone uses a mouse or taps their screen. Some people exclusively use a keyboard or custom switch input devices.</p>
                            </div>

                        <div className="">
                            <div className="h-delta text-center">
                                <img src="../../content/assets/media/images/icons/icon-vision.svg" alt="assets/media/images/icons/icon-vision.svg" className="icon icon-large" role="img" />Vision</div>

                            <p>People who are blind or low vision use the internet using a screen reader or extreme zoom tools.</p>
                            </div>

                            <div className="">
                            <div className="h-delta text-center">
                            <img src="../../content/assets/media/images/icons/icon-hearing.svg" alt="assets/media/images/icons/icon-hearing.svg" className="icon icon-large" role="img" />Hearing
                            </div>
                            <p>Some people rely on captions or transcripts to consume audio or video.</p>
                            </div>

                            <div className="">
                                <div className="h-delta text-center">
                                    <img src="../../content/assets/media/images/icons/icon-brain.svg" alt="assets/media/images/icons/icon-brain.svg" className="icon icon-large" role="img" />Cognitive
                                </div>
                                <p>There is a wide range of cognitive differences that can be accommodated by design and code.</p>
                            </div>
                        </div>
                    </div>

                    <div className="questions-survey-container flex-col">
                        <div className="container section accessible-summary">
                            <div className="h-bravo">Common questions</div>
                           
                           <div className="expander-group details">
                                <div data-fn="toggleExpanderFail" className="expander-toggle summary" aria-expanded="false" role="application">Are all projects in scope?</div>
                                <div id="expanderContent" className="expander-content">Any digital space falls under the requirements of the Americans with Disabilities Act (ADA) and must be accessible. This includes customer and employee facing applications.
                                </div>
                            </div>

                            <div className="expander-group details">
                                <div className="expander-toggle summary" aria-expanded="false" data-fn="toggleExpanderFail" role="application">Who does this really affect?</div>
                                <div id="expanderContent" className="expander-content">Over 1/4 of the US population has a disability that requires assistive technology or accommodation.</div>
                            </div>

                            <div className="expander-group details">
                                <div  className="expander-toggle summary" aria-expanded="false" data-fn="toggleExpanderFail" role="application">How do we test our products?</div>
                                <div id="expanderContent" className="expander-content">
                                    <ol>
                                        <li>Test with the keyboard only</li>
                                        <li>Test with the mobile screenreader</li>
                                        <li>Test with the desktop screenreader</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="expander-group details">
                                <div className="expander-toggle summary" aria-expanded="false" data-fn="toggleExpanderFail" role="application">What screen reader should I use to test?</div>
                                <div id="expanderContent" className="expander-content">
                                    <img src="../../content/assets/media/images/how-to-test/screenreader-browser-pairing.png" alt="image of screenreader browser pairings" />
                                </div>  
                            </div>
                        </div>

                    <div className="container accessible-radio">
                        <div id="favorites" className="h-bravo">
                            Survey: Which is your favorite screen reader
                        </div>

                        <form>
                            <div className="fieldset">
                                <div className="legend h-charlie">Choose your favorite screen reader</div>

                                {screenReaderOptions.map((reader) => (
                                    <div 
                                        key={reader.id} 
                                        // Apply 'is-selected' class for visual feedback
                                        className={selectedReader === reader.value ? 'radio-container is-selected' : 'radio-container'} 
                                        onClick={() => handleRadioClick(reader.value)}
                                        // Add keyboard focus handling for better mouse/keyboard experience on these fake divs
                                        tabIndex={0} 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') handleRadioClick(reader.value);
                                        }}
                                    >
                                        <div id={reader.id} className="radio" />
                                        <div className="label">{reader.label}</div>
                                    </div>
                                ))}

                                    {/* ALERT BOX:
                                    The div is only rendered (or hidden via style) if there is an errorMessage.
                                    */}
                                    <div className="">
                                        <div id="response-message" dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                                    </div>

                                    <div 
                                        id="submit-response" 
                                        className="Magentaa11y-button Magentaa11y-button--primary"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </div>
                            </div>                        
                        </form>
                    </div>
                </div>
                </div>

            </div>
        </div>
    </>
  );
};


export default InaccessibleDemo;