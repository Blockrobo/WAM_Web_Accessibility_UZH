# WAM_Web_Accessibility_UZH

## Accessibility Exercise Report

I used the exercise text from the provided document and went through the website page by page as if I were completing the worksheet myself. While doing that, I also improved the implementation where I still found gaps.

The biggest changes I made are:

- I replaced the weak low-contrast visual design with a higher-contrast color system and more readable typography.
- I added proper landmarks, skip links, headings, article semantics, image alternatives, table semantics, and stronger form labelling.
- I rebuilt the navigation so menu buttons expose expanded and collapsed state, work better with keyboard input, and close when focus leaves the menu.
- I reworked the login and register forms so the HTML structure matches the visible layout and validation feedback is connected to the fields.

## Exercise 1 - Explore the Sample Website

### Problems I found in the original version

- A lot of text had very poor contrast. Light gray text on light backgrounds was hard to read.
- The pages looked visually structured, but the HTML did not express that structure well.
- The navigation used many generic `div` elements and anchor tags for interactions that behaved like buttons.
- The login page was especially confusing because labels were visually moved around with CSS instead of being placed correctly in the DOM.
- Many images had no useful text alternative.
- The article table mixed structural and visual markup in a way that was not ideal for screen readers.

### What happened when CSS was disabled

Before my changes, turning CSS off exposed several weaknesses:

- The login form reading order felt wrong because the label text did not naturally follow the visual order.
- Important visual groupings were not clearly represented by semantic HTML.
- Some areas that looked like headings were just styled `div` or `p` elements.

After my changes, the no-CSS view is much better because:

- the source order now matches the visual order more closely,
- headings are real headings,
- grouped controls are grouped with semantic HTML,
- skip links and landmarks still make sense without styling.

So overall, the changes revealed by disabling CSS are now good rather than bad, because the structure is no longer dependent on presentation hacks.

## Exercise 2 - Accessible Design

### Contrast ratio

I changed the entire visual palette in `css/common.css` so that text, controls, borders, and interactive states have much better contrast than before. The old version relied heavily on pale gray text. The new version uses dark foreground text, darker navigation, clearer borders, and stronger button states.

### Page regions

I identified and marked the main page regions using semantic elements:

- `header`
- `nav`
- `main`
- `footer`

Inside `main`, I also added meaningful `section` and `article` elements where appropriate.

My page-level landmark summary is:

- `index.html`: header, navigation, main, footer, plus internal sections for hero, news, studies, and research.
- `login.html`: header, navigation, main, footer, plus separate sections for login and registration.
- `article.html`: header, navigation, main, footer, plus the article content itself.
- `empty.html`: header, navigation, main, footer.

### Accessible font size

The original text-size buttons were not working correctly. I implemented the feature in JavaScript by changing the root `html` font size dynamically.

I also improved accessibility in two ways:

- I added `aria-label` values so screen readers announce the buttons as "Increase text size" and "Decrease text size" instead of only "A+" and "A-".
- I added a live region so assistive technology receives feedback when the text size changes.

### Reading order on the login page

The original login page was counter-intuitive because the labels were visually shifted with inline styles rather than being properly tied to inputs in the source. That means a screen reader user would encounter an order that did not reflect what a sighted user saw.

I fixed this by:

- using real `label` elements,
- placing them directly before their inputs,
- removing the CSS-positioning trick,
- connecting help text and validation text with `aria-describedby`.

This makes the reading order more logical both with CSS and without CSS.

## Exercise 3 - Accessible Navigation

### Headings

Originally, many visually important texts were not marked as headings. That is not good accessibility practice, because screen reader users often navigate by heading structure.

I corrected this by introducing a more meaningful hierarchy:

- page titles use `h1`,
- section titles use `h2`,
- article titles and smaller headings use `h3`.

### Articles and their titles

On the homepage, I changed the news items from generic layout containers into real `article` elements.

I also added `aria-labelledby` so that each article is associated with its title. This improves the experience for screen reader users because the title is available as part of the article context instead of only after moving deeper into the content.

### Menu structure

The original navigation used generic containers almost everywhere. I improved that structure by using:

- `nav` for the primary navigation region,
- list semantics for the navigation items,
- buttons for the drop-down triggers,
- explicit relationships between buttons and submenus through `aria-controls` and `aria-expanded`.

### Drop-down menu status

Before the changes, a screen reader user would not reliably receive menu state information. Now the menu trigger buttons expose whether they are expanded or collapsed, so assistive technology can announce the state correctly.

### Menu keyboard interaction

I implemented or improved the following behavior:

- `Escape` closes an open menu.
- focus returns to the menu button after closing with `Escape`.
- menu buttons are actual buttons, so the Space key works naturally.
- menus close when focus leaves them, which covers the "tabbing away" case.

### Skip links

I added a skip link to all pages so keyboard and screen reader users can jump directly to the main content.

## Exercise 4 - Accessible Forms

### Form control labelling

The original form labelling was one of the weakest parts of the site. The visible text existed, but the implementation was poor and could confuse assistive technology.

I corrected this by:

- adding explicit `label for` and matching `id` pairs,
- attaching helper text and feedback using `aria-describedby`,
- making the checkbox label clickable and correctly bound.

### Related control grouping

In the registration form, I replaced generic grouping containers with `fieldset` and `legend` for:

- Basic information
- Additional information

That gives screen reader users a much clearer sense of structure.

### Form input validation

The old form validation gave very limited feedback. I improved it by:

- showing an error summary at the top of each form,
- moving focus to the summary when validation fails,
- marking invalid controls with `aria-invalid`,
- displaying inline messages near the fields,
- keeping success and error styling visually distinct.

## Exercise 5 - Accessible Images

### Informative images

I identified the following informative images:

- the site logo,
- the article thumbnail and news thumbnails,
- the images used in homepage news cards.

In the original version, these images lacked helpful text alternatives. I added meaningful `alt` text where the image conveys content and used decorative handling where the image is only presentational.

### Complex images

For the temperature chart in `article.html`, I chose a `figure` with:

- a concise but meaningful `alt` attribute on the image,
- a longer explanatory `figcaption`,
- supporting paragraph text and a properly structured data table below it.

Why I chose this approach:

- It is simple and widely supported.
- The caption gives context without overloading the `alt` text.
- The table provides the data in a more screen-reader-friendly format.

Pros:

- easy to maintain,
- readable for both sighted users and screen reader users,
- no special browser support required.

Cons:

- the full visual nuance of the chart still has to be summarized manually,
- a dedicated long description could include even more detail if needed.

## Exercise 6 - Accessible Tables

### Header cells vs data cells

The original article table did not use table semantics as clearly as it should have. I simplified and corrected the table by separating header cells and data cells properly:

- header cells now use `th`,
- data cells use `td`,
- the main header row is placed in `thead`,
- the remaining content is placed in `tbody`.

### Column and row groups

Instead of keeping an ambiguous multi-row header structure, I simplified the table into a clearer single header row with explicit column headings and row headers for the century values. I chose this because it reduces ambiguity and makes the relationships easier for screen readers to announce.

## Exercise 7 - Accessibility Test

### WAVE accessibility tool

I could not run the WAVE browser extension inside this terminal environment, so I cannot honestly claim a real plugin result. If I were continuing the exercise on my own machine in Chrome, WAVE would be the next verification step.

Based on the code review, I expect the improved version to perform much better than the original in the following areas:

- contrast,
- missing labels,
- missing landmarks,
- missing image alternatives,
- weak heading structure,
- poor form feedback.

### CSS disabled

With CSS disabled, the improved version should behave more predictably than the original because the DOM structure now matches the intended reading order much more closely.

### Screen reader testing

I also could not run VoiceOver or JAWS from this environment, so I documented the changes that specifically target screen-reader behavior:

- landmarks and skip links,
- proper heading hierarchy,
- article labels,
- menu state announcements,
- better form labels and grouped controls,
- field-level validation messages,
- improved image and table semantics.

If I had more time in a real browser and screen reader environment, I would still test:

- the exact spoken output of the menu buttons,
- whether the live region for text size feels too chatty,
- whether the error summaries are announced consistently across browsers.

## Differences Between The Old Website And My Improved Version

### Before

- weak contrast,
- unclear heading structure,
- many generic `div` elements used instead of semantic landmarks,
- poor form labelling and visual/source-order mismatch,
- inaccessible or missing image descriptions,
- unclear table structure,
- menu state not clearly exposed to assistive technology,
- no skip links,
- font size controls were not meaningfully accessible.

### After

- much stronger color contrast and more readable typography,
- semantic page regions and better heading hierarchy,
- accessible skip links on all pages,
- improved article semantics,
- better alt text and chart explanation,
- clearer, more robust table markup,
- keyboard-friendlier navigation with proper button behavior,
- menu state exposed with ARIA,
- forms rebuilt with labels, fieldsets, legends, inline feedback, and summaries,
- text-size controls that work and announce changes.

## Files I Updated

- `index.html`
- `login.html`
- `article.html`
- `empty.html`
- `css/common.css`
- `css/index.css`
- `css/login.css`
- `css/article.css`
- `css/empty.css`
- `js/common.js`
- `js/login.js`
- `js/empty.js`

## Final Reflection

My main takeaway from the exercise is that accessibility is not just about adding ARIA after the fact. The biggest improvements came from fixing the underlying structure first: better HTML, better reading order, better headings, and better form relationships. Visual improvements like contrast and typography helped a lot, but the more important change was making the code reflect the meaning of the interface.
