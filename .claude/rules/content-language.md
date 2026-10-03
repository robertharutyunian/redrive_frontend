# Content & language

- All customer-facing text is **Armenian** (`<html lang="hy">`). This includes buttons,
  labels, placeholders, validation/error messages, `alt` text, and page `metadata`.
- Tone (brand book): straightforward, helpful, confident. Never overcomplicated or overly promotional.
- Code (identifiers, comments, commit messages) stays in English.
- No i18n library or language switcher — Armenian only until stated otherwise.
- Prices in AMD, formatted with `Intl.NumberFormat("hy-AM", { style: "currency", currency: "AMD" })`.
- Accessibility: semantic HTML, one `<h1>` per page, labelled form controls, visible focus states.
