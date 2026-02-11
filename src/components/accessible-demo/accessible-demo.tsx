import React, { useState } from "react";
import './accessible-demo.scss';


const screenReaderOptions = [
  { id: 'alphaRadio', value: 'VoiceOver for iOS', label: 'VoiceOver for iOS' },
  { id: 'bravoRadio', value: 'Talkback for Android', label: 'Talkback for Android' },
  { id: 'charlieRadio', value: 'NVDA for Windows', label: 'NVDA for Windows' },
  { id: 'deltaRadio', value: 'JAWS for Windows', label: 'JAWS for Windows' },
  { id: 'echoRadio', value: 'VoiceOver for MacOS', label: 'VoiceOver for MacOS' },
];

type ScreenReaderValue = typeof screenReaderOptions[number]['value'] | '';


const AccessibleDemo: React.FC = () => {
  // 1. State for the selected radio button value (controlled component)
  const [selectedReader, setSelectedReader] = useState<ScreenReaderValue>('');
  
  // 2. combine feedbackMessage and showAlert into a single state for error message content.
  // When this string is empty, the alert is hidden.
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handler to update state when a radio button changes
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReader(event.target.value);
    
    // Clear the error message immediately upon making a selection
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // Handler for the submit button click
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    if (selectedReader) {
      // SUCCESS CASE: Selection made.
      setErrorMessage(''); // Ensure error message is cleared
      
    } else {
      // ERROR CASE: No selection made.
      setErrorMessage(
        '<p class="error"><svg role="img" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>Error: Please select your favorite screen reader.</p>'
      );
    }
  };


  return (
    <>
    <div className="demo-page flex-col">
        <div className="hero">
            <section className="">
                <div className="flex-row">
                    <div>
                        <h1 className="h-alpha">Basic web page demo</h1>
                        <h2 className="MagentaA11y__nav-display__subtitle">
                            This basic web page demonstrates how a screen reader consumes headings, forms and interactive elements.
                        </h2>
                    </div>
                    <div className="">
                        <h3 className="h-delta">
                            We want to know your favorite screen reader.
                        </h3>
                        <a href="#favorites" className="Magentaa11y-button Magentaa11y-button--primary">
                            Screen reader survey
                        </a>
                    </div>
                </div>
            </section>
        </div>
        <div>
            <section className="container">
                <h2 className="h-bravo text-center">Broad categories of disabilities</h2>

                <div className="section flex-row">
                    <div className="">
                        <h3 className="h-delta text-center">
                            <img src="../../content/assets/media/images/icons/icon-pointer.svg" alt="" className="icon icon-large" />
                            Motor
                        </h3>
                        <p>Not everyone uses a mouse or taps their screen. Some people exclusively use a keyboard or custom switch input devices.</p>
                    </div>

                    <div className="">
                        <h3 className="h-delta text-center">
                        <img src="../../content/assets/media/images/icons/icon-vision.svg" alt="" className="icon icon-large" />
                        Vision
                        </h3>
                        <p>People who are blind or low vision use the internet using a screen reader or extreme zoom tools.</p>
                    </div>

                    <div className="">
                        <h3 className="h-delta text-center">
                        <img src="../../content/assets/media/images/icons/icon-hearing.svg" alt="" className="icon icon-large" />
                        Hearing
                        </h3>
                        <p>Some people rely on captions or transcripts to consume audio or video.
                        </p>
                    </div>

                    <div className="">
                        <h3 className="h-delta text-center">
                        <img src="../../content/assets/media/images/icons/icon-brain.svg" alt="" className="icon icon-large" />Cognitive
                        </h3>
                        <p>There is a wide range of cognitive differences that can be accommodated by design and code.
                        </p>
                    </div>
                </div>
            </section>

            <div className="questions-survey-container flex-col">
                <section className="container section accessible-summary">
                    <h2 className="h-bravo">Common questions</h2>

                    <details>
                        <summary>Are all projects in scope?</summary>
                        Any digital space falls under the requirements of the Americans with Disabilities Act (ADA) and must be accessible.
                        This includes customer and employee facing applications.
                    </details>

                    <details>
                        <summary>Who does this really affect?</summary>
                        Over 1/4 of the US population has a disability that requires assistive technology or accommodation.
                    </details>

                    {/* eslint-disable jsx-a11y/no-redundant-roles */}
                    <details>
                        <summary>How do we test our products?</summary>
                        <ol role="list">
                            <li role="listitem">Test with the keyboard only</li>
                            <li role="listitem">
                                Test with the mobile screenreader
                            </li>
                            <li role="listitem">
                                Test with the desktop screenreader
                            </li>
                        </ol>
                    </details>
                    
                    {/* eslint-enable jsx-a11y/no-redundant-roles */}
                    <details>
                        <summary>What screen reader should I use to test?</summary>
                            <table className="comparison">
                                <caption className="center-text h-charlie">
                                    Screen reader and browser pairings
                                </caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Platform</th>
                                        <th scope="col">Screenreader</th>
                                        <th scope="col">Browser</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <img src="../../content/assets/media/images/icons/logo-apple.svg" alt="" className="icon" />
                                            iOS
                                        </th>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-apple.svg" alt="" className="icon" />
                                            VoiceOver
                                        </td>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-safari.svg" alt="" className="icon" />
                                            Safari
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img src="../../content/assets/media/images/icons/logo-android.svg" alt="" className="icon" />
                                            Android
                                        </th>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-talkback.svg" alt="" className="icon" />
                                            Talkback
                                        </td>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-chrome.svg" alt="" className="icon" />
                                            Chrome
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img src="../../content/assets/media/images/icons/logo-windows.svg" alt="" className="icon" />
                                            Windows
                                        </th>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-jaws.svg" alt="" className="icon" />
                                            JAWS
                                        </td>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-chrome.svg" alt="" className="icon" />
                                            Chrome
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img src="../../content/assets/media/images/icons/logo-windows.svg" alt="" className="icon" />
                                            Windows
                                        </th>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-nvda.svg" alt="" className="icon" />
                                            NVDA
                                        </td>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-chrome.svg" alt="" className="icon" />
                                            Chrome
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <img src="../../content/assets/media/images/icons/logo-apple.svg" alt="" className="icon" />
                                            MacOS
                                        </th>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-apple.svg" alt="" className="icon" />
                                            VoiceOver
                                        </td>
                                        <td>
                                            <img src="../../content/assets/media/images/icons/logo-safari.svg" alt="" className="icon" />
                                            Safari
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </details>            
            </section>
        

            <section className="container accessible-radio">
                <h2 id="favorites" className="h-bravo">
                    Survey: Which is your favorite screen reader
                </h2>
                    <form aria-labelledby="favorites">
                        <fieldset className="fieldset">
                            <legend className="legend h-charlie">Choose your favorite screen reader</legend>

                            {/* Map over the data array to create radio inputs */}
                            {screenReaderOptions.map((reader) => (
                                <div key={reader.id} className="radio-container">
                                    <input 
                                        type="radio" 
                                        name="favorite" 
                                        id={reader.id} 
                                        className="radio" 
                                        value={reader.value} 
                                        checked={selectedReader === reader.value} 
                                        onChange={handleRadioChange} 
                                    />
                                    <label className="label" htmlFor={reader.id}>{reader.label}</label>
                                </div>
                            ))}
                            
                        {/* 
                            The alert is conditionally shown based on the `errorMessage` state.
                            It is completely hidden (and inert) if the string is empty.
                        */}
                        <div 
                            role="alert" 
                            className="" 
                            // Only visible if there is an errorMessage string
                        >
                            {/* Use dangerouslySetInnerHTML to render the error message with the SVG/HTML */}
                            <div id="response-message" dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                        </div>

                        <button 
                            type="button" 
                            id="submit-response" 
                            className="Magentaa11y-button Magentaa11y-button--primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        </fieldset>
                    </form>
                </section>
            </div>
        </div>
    </div>
    </>
  );
};

export default AccessibleDemo;