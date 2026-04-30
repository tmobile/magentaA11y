Learn how to test Browser Zoom, Text Resize, 
and Magnification 
through Desktop Operating System settings.


Developer Notes
General requirements

Users may enlarge content for improved readability in the following basic ways. Verification of successful magnification through browser zoom or operating system settings also requires manual visual verification of the interface to confirm that there is no loss of content or functionality when enabling:

200 percent browser (or text doubled to roughly twice the default font size)
400 percent browser zoom
Magnify screen features through desktop Operating System (OS) settings.


The Web Content Accessibility Guidelines (WCAG) provides requirements on what outcomes must be avoided when content is magnified or zoomed:
•	Loss of content
•	Loss of controls
•	cut off or visually clipped content
•	truncated content
•	overlapping content
•	horizontal scrollbar scrolling to access non-two-dimensional content


Exceptions: Content in two-dimensional layouts which does not need to meet these magnification requirements includes:
maps
diagrams
video
games or interactive puzzles
persistent toolbars
presentations
data tables


How to test

Browsers
•	Any major browser (Chrome, Safari, Firefox, or Edge) is acceptable for browser zoom testing.
Manual testing
Browser zoom testing must be complemented with visual inspection of the content and manual checks of retained page functionality after zoom settings have been changed on the Web page.

Getting started

Text Resize at 200 percent browser zoom
•	Open the Web page that you are testing in a browser (Chrome, Safari, Firefox, or Edge). Locate the Settings button near the browser toolbar area (often styled as an “ellipsis” icon button). Alternatively, navigate to the browser horizontal context menu and select View > Zoom.
•	Select the Settings button. Then change the browser Zoom setting to 200%. 
•	Observe if there is any truncation, text overlap, partially cut off content, or complete loss of content or functionality.
•	In addition, check that all interactive functionality is still available (whether in direct view or behind menus or disclosures) and remains intact at 200 percent zoom.
Reflow at 400 percent browser zoom
•	Open the Web page that you are testing in a browser (Chrome, Safari, Firefox, or Edge). Locate the Settings button near the browser toolbar area (often styled as an “ellipsis” icon button). Alternatively, navigate to the browser horizontal context menu and select View > Zoom.
•	Select the Settings button. Then change the browser Zoom setting to 400%. 
•	Observe if there is any truncation, text overlap, partially cut off content, or complete loss of content or functionality. Note: Content that reflows content into a responsive layout such as collapsing into a  single or multi-column display is allowed and encouraged.
•	In addition, check that all interactive functionality is available (whether in direct view or behind menus or disclosures) and remains intact at 400 percent zoom.
•	Also check that horizontal scrolling is not required to bring essential content or functionality into view.



What to test for

•	Content or interactive elements disappear entirely after reflow (i.e., the content or interactive elements do shift into a single column layout).
•	Labels above text inputs are hidden and replaced by placeholder text after reflow, without a technique showing dedicated labels when focusing the fields.
•	One or more sections of content text completely disappear after reflow, without being available through a disclosure widget or another expand/collapse responsive view.)
•	Content images or graphics become cutoff or illegible after reflow, without the ability to link to or fully view an equivalent alternative.
•	A global search field disappears after reflow, without an icon or menu option to reveal a search function or reach an equivalent search page.


✓ Ensure text content remains legible when scaled to 200 percent browser zoom
Note: This requirement is only for Web page text such as headings, body text, link text, button text labels, form field labels, and text inside form inputs, etc. (and excludes captions and images of text).
Pass	Fail
	

✓ Ensure that text content does not truncate when scaled to 200 percent browser zoom
Pass	Fail
	






✓ Ensure Web page content and text in form controls is not partially cut off at 200 percent browser zoom (e.g., partially cutoff from complete access or view on either the left or right side of the page.)
Pass	Fail
	

✓ Ensure that text content does not overlap when scaled to 200 percent browser zoom
Pass	Fail
	


✓ Ensure that text content and form elements do not completely disappear when browser zoom is set to 200 percent (e.g., no loss of content).
Pass	Fail
	

✓ Ensure that text content does not truncate when scaled to 400 percent browser zoom
Pass	Fail
	


✓ Ensure that text content does not overlap when scaled to 400 percent browser zoom
Pass	Fail
	



✓ Ensure Web page content and form controls are not partially cut off at 400 percent browser zoom (e.g., partially cutoff from complete access or view on the left or right side of the page)
Pass	Fail
	


✓ Ensure Web page content and form controls reflow to remain available at 400 percent browser zoom
Note: Content and functionality are allowed to collapse behind menus or expand/collapse disclosure elements as long as the content or functionality is equivalent to what is offered at the default 100 percent browser zoom.

Pass	Fail
	



✓ Ensure that no text content, form elements, or controls completely disappear when browser zoom is set to 400 percent (e.g., no loss of content)
Pass	Fail
	


✓ Ensure horizontal scroll bar scrolling is not required to access essential content and functionality
Exceptions: Content in content in two-dimensional layouts such as maps, diagrams, video, games, persistent toolbars, presentations, and data tables. 
Pass	Fail
	



Additional Magnification Tests: 
Adjusting Desktop Operating System Settings (Optional)

Mac OS Basic Keyboard Shortcuts

Key	Action
Option + Command + Plus Sign (+)	Zoom In

Option + Command + Minus Sign (+)	Zoom Out
Option + Command + 8	Toggle Zoom On/Off


Windows OS Basic Keyboard Shortcuts

Key	Action
Windows key + Plus Sign (+)	Zoom In

Windows key + Minus Sign (+)	Zoom Out
Windows key + Esc	Exit Magnifier



Exceptions

Content exempt from 200 percent and 400 percent browser zoom requirements includes content in two-dimensional layouts such as maps, diagrams, video, games, persistent toolbars, presentations, and data tables.

Related WCAG
•	1.4.4 Resize text
•	1.4.10 Reflow


Resources
•	Responsive Design and Reflow
•	Zoom in on your Mac screen (Mac OS)  
•	Magnifier keyboard shortcuts and touch gestures (Windows OS) 




