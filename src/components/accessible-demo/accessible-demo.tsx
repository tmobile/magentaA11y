import React from "react";

const AccessibleDemo: React.FC = () => {
  return (
    <div>
      <div className="billboard">
            <div className="container group-2-1">
                <div>
                    <h1 className="h-alpha">Basic web page demo</h1>
                    <p className="h-bravo subhead">
                        This basic web page demonstrates how a screen reader consumes headings, forms and interactive elements.
                    </p>
                </div>
                <div className="lowlight center-text">
                    <h2 className="h-delta">
                        We want to know your favorite screen reader.
                    </h2>
                    <a href="#favorites" className="button">
                        Screen reader survey
                    </a>
                </div>
            </div>
        </div>


        <div className="container">
            <h2 className="h-bravo center-text">
                Broad categories of disabilities
            </h2>
        </div>

        <div className="container section group-4">
            <div className="display-list">
                <h3 className="h-charlie center-text">
                <img src="{{ site.baseurl }}/assets/images/icons/icon-pointer.svg"
                        role="img"
                        alt=""
                        className="icon icon-large" />
                Motor
                </h3>
                <p>
                Not everyone uses a mouse or taps their screen.
                Some people exclusively use a keyboard or custom switch input devices.
                </p>
            </div>


            <div className="display-list">
                <h3 className="h-charlie center-text">
                <img src="{{ site.baseurl }}/assets/images/icons/icon-vision.svg"
                        role="img"
                        alt=""
                        className="icon icon-large" />
                Vision
                </h3>
                <p>
                People who are blind or low vision use the internet using a screen reader or extreme zoom tools.
                </p>
            </div>

            <div className="display-list">
                <h3 className="h-charlie center-text">
                <img src="{{ site.baseurl }}/assets/images/icons/icon-hearing.svg"
                        role="img"
                        alt=""
                        className="icon icon-large" />
                Hearing
                </h3>
                <p>
                Some people rely on captions or transcripts to consume audio or video.
                </p>
            </div>

            <div className="display-list">
                <h3 className="h-charlie center-text">
                <img src="{{ site.baseurl }}/assets/images/icons/icon-brain.svg"
                        role="img"
                        alt=""
                        className="icon icon-large" />
                Cognitive
                </h3>
                <p>
                There is a wide range of cognitive differences that can be accommodated by design and code.
                </p>
            </div>
        </div>


        <div className="container section narrow">
            <h2 className="h-bravo">
                Common questions
            </h2>

            <details>
                <summary>
                Are all projects in scope?
                </summary>
                Any digital space falls under the requirements of the Americans with Disabilities Act (ADA) and must be accessible.
                This includes customer and employee facing applications.
            </details>

            <details>
                <summary>
                Who does this really affect?
                </summary>
                Over 1/4 of the US population has a disability that requires assistive technology or accommodation.
            </details>

            <details>
                <summary>
                How do we test our products?
                </summary>
                <ol>
                <li>Test with the keyboard only</li>
                <li>
                    Test with the mobile screenreader
                </li>
                <li>
                    Test with the desktop screenreader
                </li>
                </ol>
            </details>

            <details>
                <summary>
                What screen reader should I use to test?
                </summary>
                    <table className="comparison">
                        <caption className="center-text h-charlie">
                            Screen reader and browser pairings
                        </caption>
                        <thead>
                        <tr><th scope="col">
                            Platform
                        </th>
                        <th scope="col">
                            Screenreader
                        </th>
                        <th scope="col">
                            Browser
                        </th>
                        </tr></thead>
                        <tbody>
                        <tr>
                            <th scope="row">
                            <img src="/assets/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                            iOS
                            </th>
                            <td>
                            <img src="/assets/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                            VoiceOver
                            </td>
                            <td>
                            <img src="/assets/images/icons/logo-safari.svg" role="img" alt="Apple" className="icon" />
                            Safari
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                            <img src="/assets/images/icons/logo-android.svg" role="img" alt="" className="icon" />
                            Android
                            </th>
                            <td>
                            <img src="/assets/images/icons/logo-talkback.svg" role="img" alt="" className="icon" />
                            Talkback
                            </td>
                            <td>
                            <img src="/assets/images/icons/logo-chrome.svg" role="img" alt="" className="icon" />
                            Chrome
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                            <img src="/assets/images/icons/logo-windows.svg" role="img" alt="" className="icon" />
                            Windows
                            </th>
                            <td>
                            <img src="/assets/images/icons/logo-jaws.svg" role="img" alt="" className="icon" />
                            JAWS
                            </td>
                            <td>
                            <img src="/assets/images/icons/logo-chrome.svg" role="img" alt="" className="icon" />
                            Chrome
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                            <img src="/assets/images/icons/logo-windows.svg" role="img" alt="" className="icon" />
                            Windows
                            </th>
                            <td>
                            <img src="/assets/images/icons/logo-nvda.svg" role="img" alt="" className="icon" />
                            NVDA
                            </td>
                            <td>
                            <img src="/assets/images/icons/logo-chrome.svg" role="img" alt="" className="icon" />
                            Chrome
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                            <img src="/assets/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                            MacOS
                            </th>
                            <td>
                            <img src="/assets/images/icons/logo-apple.svg" role="img" alt="Apple" className="icon" />
                            VoiceOver
                            </td>
                            <td>
                            <img src="/assets/images/icons/logo-safari.svg" role="img" alt="Apple" className="icon" />
                            Safari
                            </td>
                        </tr>
                        </tbody>
                        </table>
            </details>
        </div>

        <div className="container narrow">
            <h2 id="favorites" className="h-bravo">
                Survey: Which is your favorite screen reader
            </h2>

            <form aria-labelledby="favorites">
                <fieldset>
                    <legend>
                        Choose your favorite screen reader
                    </legend>

                    <input type="radio" name="nato" id="alphaRadio" />
                    <label htmlFor="alphaRadio">VoiceOver for iOS</label>

                    <input type="radio" name="nato" id="bravoRadio" />
                    <label htmlFor="bravoRadio">Talkback for Android</label>

                    <input type="radio" name="nato" id="charlieRadio" />
                    <label htmlFor="charlieRadio">NVDA for Windows</label>

                    <input type="radio" name="nato" id="deltaRadio" />
                    <label htmlFor="deltaRadio">JAWS for Windows</label>

                    <input type="radio" name="nato" id="echoRadio" />
                    <label htmlFor="echoRadio">VoiceOver for MacOS</label>
                </fieldset>

                <div role="alert" className="alert inert">
                    <div id="response-message"></div>
                </div>

                <button type="button" id="submit-response">
                    Submit
                </button>
            </form>
        </div>
    </div>
  );
};

export default AccessibleDemo;
