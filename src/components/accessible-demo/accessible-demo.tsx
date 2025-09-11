import React from "react";

const AccessibleDemo: React.FC = () => {
  return (
    <>
    <div className="flex-col">
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

        <div  className="">
            <section className="container">
                <h2 className="h-bravo text-center">Broad categories of disabilities</h2>

                <div className="section flex-row">
                    <div className="">
                        <h3 className="h-delta text-center">
                            <img src="../../content/assets/media/images/icons/icon-pointer.svg" role="img" alt="" className="icon icon-large" />
                            Motor
                        </h3>
                        <p>Not everyone uses a mouse or taps their screen. Some people exclusively use a keyboard or custom switch input devices.</p>
                    </div>

                    <div className="">
                        <h3 className="h-delta text-center">
                        <img src="../../content/assets/media/images/icons/icon-vision.svg" role="img" alt="" className="icon icon-large" />
                        Vision
                        </h3>
                        <p>People who are blind or low vision use the internet using a screen reader or extreme zoom tools.</p>
                    </div>

                    <div className="">
                        <h3 className="h-delta text-center">
                        <img src="../../content/assets/media/images/icons/icon-hearing.svg" role="img" alt="" className="icon icon-large" />
                        Hearing
                        </h3>
                        <p>Some people rely on captions or transcripts to consume audio or video.
                        </p>
                    </div>

                    <div className="">
                        <h3 className="h-delta text-center">
                        <img src="../../content/assets/media/images/icons/icon-brain.svg" role="img" alt="" className="icon icon-large" />Cognitive
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
                                        <img src="../../content/assets/media/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                                        iOS
                                    </th>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                                        VoiceOver
                                    </td>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-safari.svg" role="img" alt="Apple" className="icon" />
                                        Safari
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <img src="../../content/assets/media/images/icons/logo-android.svg" role="img" alt="" className="icon" />
                                        Android
                                    </th>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-talkback.svg" role="img" alt="" className="icon" />
                                        Talkback
                                    </td>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-chrome.svg" role="img" alt="" className="icon" />
                                        Chrome
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <img src="../../content/assets/media/images/icons/logo-windows.svg" role="img" alt="" className="icon" />
                                        Windows
                                    </th>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-jaws.svg" role="img" alt="" className="icon" />
                                        JAWS
                                    </td>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-chrome.svg" role="img" alt="" className="icon" />
                                        Chrome
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <img src="../../content/assets/media/images/icons/logo-windows.svg" role="img" alt="" className="icon" />
                                        Windows
                                    </th>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-nvda.svg" role="img" alt="" className="icon" />
                                        NVDA
                                    </td>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-chrome.svg" role="img" alt="" className="icon" />
                                        Chrome
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <img src="../../content/assets/media/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                                        MacOS
                                    </th>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                                        VoiceOver
                                    </td>
                                    <td>
                                        <img src="../../content/assets/media/images/icons/logo-safari.svg" role="img" alt="Apple" className="icon" />
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
                    <fieldset>
                        <legend>Choose your favorite screen reader</legend>

                        <div className="radio-container">
                            <input type="radio" name="nato" id="alphaRadio" className="radio"/>
                            <label htmlFor="alphaRadio">VoiceOver for iOS</label>
                        </div>

                        <div className="radio-container">
                            <input type="radio" name="nato" id="bravoRadio" />
                            <label htmlFor="bravoRadio">Talkback for Android</label>
                        </div>
                        
                        <div className="radio-container">
                            <input type="radio" name="nato" id="charlieRadio" />
                            <label htmlFor="charlieRadio">NVDA for Windows</label>
                        </div>
                        
                        <div className="radio-container">
                            <input type="radio" name="nato" id="deltaRadio" />
                            <label htmlFor="deltaRadio">JAWS for Windows</label>
                        </div>
                        
                        <div className="radio-container">
                            <input type="radio" name="nato" id="echoRadio" />
                            <label htmlFor="echoRadio">VoiceOver for MacOS</label>
                        </div>
                    </fieldset>

                    <div role="alert" className="alert inert">
                        <div id="response-message"></div>
                    </div>

                    <button type="button" id="submit-response" className="Magentaa11y-button Magentaa11y-button--primary">Submit</button>
                </form>
            </section>
        </div>
        </div>
    </div>
    </>
  );
};

export default AccessibleDemo;
