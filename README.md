# Web and Mobile Accessibility Project

This project is an accessibility-focused redesign of a sample university website ("Lorem Ipsum Institute of Technology") for the UZH course **Web and Mobile Accessibility**.

The goal is to demonstrate how a static website can be improved to better support:

- keyboard-only users,
- screen reader users,
- users with low vision,
- and users who rely on clear structure and readable content.

## What this project includes

The site contains four main pages:

- `index.html` - Homepage with accessible navigation, news articles, and structured sections.
- `login.html` - Login and registration page with improved form semantics and validation feedback.
- `article.html` - Article page with accessible image/caption usage and a properly structured data table.
- `empty.html` - Generic content page used for navigation targets.

## Accessibility improvements implemented

The project improves common accessibility issues found in the original version:

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and clearer heading hierarchy.
- Skip links to jump directly to the main content.
- Better contrast, typography, and focus visibility.
- Accessible dropdown navigation with keyboard support and state announcements (`aria-expanded`).
- Form controls with explicit labels, helper text, grouped fields (`fieldset`/`legend`), and error summaries.
- Improved image alternatives (`alt`) and chart context with `figure`/`figcaption`.
- Better table structure using `caption`, `thead`, `tbody`, `th`, and `td`.
- Text-size controls with accessible labels and live announcements.

## Project structure

- `css/` - shared and page-specific styles (`common.css`, `index.css`, `login.css`, `article.css`, `empty.css`)
- `js/` - interaction and accessibility behavior (`common.js`, `login.js`, `empty.js`, `article.js`)
- `img/` - images used across the website
- HTML files in the root folder represent individual pages

## Run the project

This is a static website, so no build step is required.

To run locally:

1. Open the project folder in your editor.
2. Open `index.html` in a browser, or serve the folder with a local static server.
3. Navigate through the pages and test keyboard navigation (`Tab`, `Shift+Tab`, `Enter`, `Escape`).

## Why this project matters

The project shows that accessibility is not only about adding ARIA attributes. The biggest gains come from combining:

- semantic HTML structure,
- usable interaction patterns,
- readable visual design,
- and meaningful feedback for assistive technologies.
