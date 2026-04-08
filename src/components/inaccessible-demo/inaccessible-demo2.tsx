/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const InaccessibleDemo: React.FC = () => {
  return (
    <div>
      <div className="billboard">
        <div className="container group-2-1">
          <div>
            <div className="h-alpha">Inaccessible web page demo</div>
            <p className="h-bravo subhead">
              This inaccessible web page demonstrates how a page can work
              perfectly for someone using a mouse, but still be completely
              inaccessible.
            </p>
          </div>
          <div className="lowlight center-text">
            <div className="h-delta">
              We want to know your favorite screen reader.
            </div>

            {/* eslint-disable-next-line   jsx-a11y/img-redundant-alt */}
            {/* <a tabIndex="-1" href="#favorites" className="button">
                Click here
            </a> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="h-bravo center-text">
          Broad categories of disabilities
        </div>
      </div>

      <div className="container section group-4">
        <div className="display-list">
          <div className="h-charlie center-text">
            <img
              src="{{ site.baseurl }}/assets/images/icons/icon-pointer.svg"
              role="img"
              alt="{{ site.baseurl }}/assets/images/icons/icon-pointer.svg"
              className="icon icon-large"
            />
            Motor
          </div>
          <p>
            Not everyone uses a mouse or taps their screen. Some people
            exclusively use a keyboard or custom switch input devices.
          </p>
        </div>

        <div className="display-list">
          <div className="h-charlie center-text">
            <img
              src="{{ site.baseurl }}/assets/images/icons/icon-vision.svg"
              role="img"
              alt="{{ site.baseurl }}/assets/images/icons/icon-vision.svg"
              className="icon icon-large"
            />
            Vision
          </div>
          <p>
            People who are blind or low vision use the internet using a screen
            reader or extreme zoom tools.
          </p>
        </div>

        <div className="display-list">
          <div className="h-charlie center-text">
            <img
              src="{{ site.baseurl }}/assets/images/icons/icon-hearing.svg"
              role="img"
              alt="{{ site.baseurl }}/assets/images/icons/icon-hearing.svg"
              className="icon icon-large"
            />
            Hearing
          </div>
          <p>
            Some people rely on captions or transcripts to consume audio or
            video.
          </p>
        </div>

        <div className="display-list">
          <div className="h-charlie center-text">
            <img
              src="{{ site.baseurl }}/assets/images/icons/icon-brain.svg"
              role="img"
              alt="{{ site.baseurl }}/assets/images/icons/icon-brain.svg"
              className="icon icon-large"
            />
            Cognitive
          </div>
          <p>
            There is a wide range of cognitive differences that can be
            accommodated by design and code.
          </p>
        </div>
      </div>

      <div className="container section narrow">
        <div className="h-bravo">Common questions</div>

        <div className="expander-group">
          <div
            className="button expander-toggle"
            aria-expanded="false"
            role="application"
          >
            Are all projects in scope?
          </div>
          <div className="expander-content">
            Any digital space falls under the requirements of the Americans with
            Disabilities Act (ADA) and must be accessible. This includes
            customer and employee facing applications.
          </div>
        </div>

        <div className="expander-group">
          <div
            className="button expander-toggle"
            aria-expanded="false"
            role="application"
          >
            Who does this really affect?
          </div>
          <div className="expander-content">
            Over 1/4 of the US population has a disability that requires
            assistive technology or accommodation.
          </div>
        </div>

        <div className="expander-group">
          <div
            className="button expander-toggle"
            aria-expanded="false"
            role="application"
          >
            How do we test our products?
          </div>
          <div className="expander-content">
            <ol>
              <li>Test with the keyboard only</li>
              <li>Test with the mobile screenreader</li>
              <li>Test with the desktop screenreader</li>
            </ol>
          </div>
        </div>

        <div className="expander-group">
          <div
            className="button expander-toggle"
            aria-expanded="false"
            role="application"
          >
            What screen reader should I use to test?
          </div>
          <div className="expander-content">
            <img
              src="/assets/images/examples/screenreader-browser-pairing.png"
              alt="image of screenreader browser pairings"
            />
          </div>
        </div>
      </div>

      <div className="container narrow">
        <div id="favorites" className="h-bravo">
          Survey: Which is your favorite screen reader
        </div>

        <form>
          <div className="fieldset">
            <div className="legend h-charlie">
              Choose your favorite screen reader
            </div>

            <div className="radio" id="alphaRadio"></div>
            <div className="label fake-radio">VoiceOver for iOS</div>

            <div className="radio" id="bravoRadio"></div>
            <div className="label fake-radio">Talkback for Android</div>

            <div className="radio" id="charlieRadio"></div>
            <div className="label fake-radio">NVDA for Windows</div>

            <div className="radio" id="deltaRadio"></div>
            <div className="label fake-radio">JAWS for Windows</div>

            <div className="radio" id="echoRadio"></div>
            <div className="label fake-radio">VoiceOver for MacOS</div>
          </div>

          <div className="alert inert">
            <div id="response-message"></div>
          </div>

          <div className="button" id="submit-response">
            Submit
          </div>
        </form>
      </div>
    </div>
  );
};

export default InaccessibleDemo;
