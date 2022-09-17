const svgToDataUri = require("mini-svg-data-uri")
const plugin = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const xdColors = require("../colors")

// 16px font with 24px (1.5rem) line height
const [baseFontSize, { lineHeight: baseLineHeight }] =
  defaultTheme.fontSize.base

// 20px font with 28px (1.75rem) line height
const [xLFontSize, { lineHeight: xLLineHeight }] = defaultTheme.fontSize["xl"]

// 24px font with 32px (2rem) line height
const [twoXLFontSize, { lineHeight: twoXLLineHeight }] =
  defaultTheme.fontSize["2xl"]

// default utilities from tailwindcss
const { spacing, borderWidth, borderRadius, fontWeight } = defaultTheme

const XDBaseClass = plugin.withOptions(function (
  options = { strategy: undefined }
) {
  return function ({ addBase, addComponents, theme }) {
    const strategy =
      options.strategy === undefined ? ["base", "class"] : [options.strategy]

    const rules = [
      // #region headers
      {
        base: ["h1", "h2", "h3", "h4", "h5", "h6"],
        styles: {
          "font-family": `"Red Hat Display", sans-serif`,
        },
      },
      {
        base: ["h1"],
        class: ["h1"],
        styles: {
          fontSize: "2rem",
          lineHeight: "1.5",
        },
      },
      {
        base: ["h2"],
        class: ["h2"],
        styles: {
          fontSize: twoXLFontSize,
          lineHeight: twoXLLineHeight,
        },
      },
      {
        base: ["h3"],
        class: ["h3"],
        styles: {
          fontSize: xLFontSize,
          lineHeight: xLLineHeight,
        },
      },
      ///#endregion headers
      // #region buttons
      {
        base: ["button"],
        class: ["button"],
        styles: {
          display: "flex",
          "font-size": baseFontSize,
          "line-height": baseLineHeight,
          "align-items": "center",
          "justify-content": "center",
          "font-weight": fontWeight["semibold"],
          "padding-top": spacing[3],
          "padding-right": spacing[4],
          "padding-bottom": spacing[3],
          "padding-left": spacing[4],
          "border-radius": borderRadius["sm"],
          "border-style": "inset",
          transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
      {
        base: ["button:disabled"],
        class: ["button-disabled"],
        styles: {
          "background-color": xdColors["xd-neutral"][200],
          color: xdColors["xd-disabled-black"].rgba,
          cursor: "not-allowed",
        },
      },
      // #endregion buttons
      // #region inputs
      {
        base: [
          "[type='text']",
          "[type='email']",
          "[type='url']",
          "[type='password']",
          "[type='number']",
          "[type='date']",
          "[type='datetime-local']",
          "[type='month']",
          "[type='search']",
          "[type='tel']",
          "[type='time']",
          "[type='week']",
          "[multiple]",
          "textarea",
          "select",
        ],
        class: [
          ".form-input",
          ".form-textarea",
          ".form-select",
          ".form-multiselect",
        ],
        styles: {
          color: xdColors["xd-primary"].black,
          appearance: "none",
          "background-color": xdColors["xd-primary"].white,
          "border-color": xdColors["xd-neutral"][300],
          "border-width": borderWidth["DEFAULT"],
          "border-radius": borderRadius["sm"],
          "padding-top": spacing[2],
          "padding-right": spacing[3],
          "padding-bottom": spacing[2],
          "padding-left": spacing[3],
          "font-size": "inherit",
          "line-height": baseLineHeight,
          "--tw-shadow": `0 0 ${xdColors["xd-primary"].black}`,
          "&:focus": {
            outline: "2px solid transparent",
            "outline-offset": "2px",
            "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
            "--tw-ring-offset-width": "0px",
            "--tw-ring-offset-color": xdColors["xd-primary"].white,
            "--tw-ring-color": xdColors["xd-primary"]["purple-700"],
            "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
            "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
            "box-shadow": `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
            "border-color": xdColors["xd-primary"]["purple-700"],
          },
        },
      },
      {
        base: [`[type='text']`],
        class: [".form-text"],
        styles: {
          "border-color": "transparent",
        },
      },
      {
        base: [`[aria-invalid='true']`],
        class: [".form-input::invalid"],
        styles: {
          "--tw-ring-color": xdColors["xd-danger"][800],
        },
      },
      {
        base: ["input::placeholder", "textarea::placeholder"],
        class: [".form-input::placeholder", ".form-textarea::placeholder"],
        styles: {
          color: xdColors["xd-disabled-black"].rgba,
          opacity: "1",
        },
      },
      {
        base: ["::-webkit-datetime-edit-fields-wrapper"],
        class: [".form-input::-webkit-datetime-edit-fields-wrapper"],
        styles: {
          padding: "0",
        },
      },
      {
        // Unfortunate hack until https://bugs.webkit.org/show_bug.cgi?id=198959 is fixed.
        // This sucks because users can't change line-height with a utility on date inputs now.
        // Reference: https://github.com/twbs/bootstrap/pull/31993
        base: ["::-webkit-date-and-time-value"],
        class: [".form-input::-webkit-date-and-time-value"],
        styles: {
          "min-height": "1.5em",
        },
      },
      {
        // In Safari on macOS date time inputs are 4px taller than normal inputs
        // This is because there is extra padding on the datetime-edit and datetime-edit-{part}-field pseudo elements
        // See https://github.com/tailwindlabs/tailwindcss-forms/issues/95
        base: [
          "::-webkit-datetime-edit",
          "::-webkit-datetime-edit-year-field",
          "::-webkit-datetime-edit-month-field",
          "::-webkit-datetime-edit-day-field",
          "::-webkit-datetime-edit-hour-field",
          "::-webkit-datetime-edit-minute-field",
          "::-webkit-datetime-edit-second-field",
          "::-webkit-datetime-edit-millisecond-field",
          "::-webkit-datetime-edit-meridiem-field",
        ],
        class: [
          ".form-input::-webkit-datetime-edit",
          ".form-input::-webkit-datetime-edit-year-field",
          ".form-input::-webkit-datetime-edit-month-field",
          ".form-input::-webkit-datetime-edit-day-field",
          ".form-input::-webkit-datetime-edit-hour-field",
          ".form-input::-webkit-datetime-edit-minute-field",
          ".form-input::-webkit-datetime-edit-second-field",
          ".form-input::-webkit-datetime-edit-millisecond-field",
          ".form-input::-webkit-datetime-edit-meridiem-field",
        ],
        styles: {
          "padding-top": 0,
          "padding-bottom": 0,
        },
      },
      {
        base: ["select"],
        class: [".form-select"],
        styles: {
          "background-image": `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${theme(
              "colors.gray.500",
              colors.gray[500]
            )}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
          )}")`,
          "background-position": `right ${spacing[2]} center`,
          "background-repeat": `no-repeat`,
          "background-size": `1.5em 1.5em`,
          "padding-right": spacing[10],
          "print-color-adjust": `exact`,
        },
      },
      {
        base: ["[multiple]"],
        class: null,
        styles: {
          "background-image": "initial",
          "background-position": "initial",
          "background-repeat": "unset",
          "background-size": "initial",
          "padding-right": spacing[3],
          "print-color-adjust": "unset",
        },
      },
      {
        base: [`[type='checkbox']`, `[type='radio']`],
        class: [".form-checkbox", ".form-radio"],
        styles: {
          appearance: "none",
          padding: "0",
          "print-color-adjust": "exact",
          display: "inline-block",
          "vertical-align": "middle",
          "background-origin": "border-box",
          "user-select": "none",
          "flex-shrink": "0",
          height: spacing[4],
          width: spacing[4],
          color: xdColors["xd-primary"]["purple-700"],
          "background-color": "#fff",
          "border-color": xdColors["xd-disabled-black"].rgba,
          "border-width": borderWidth["DEFAULT"],
          "--tw-shadow": `0 0 ${xdColors["xd-primary"].black}`,
        },
      },
      {
        base: [`[type='checkbox']`],
        class: [".form-checkbox"],
        styles: {
          "border-radius": borderRadius["sm"],
        },
      },
      {
        base: [`[type='radio']`],
        class: [".form-radio"],
        styles: {
          "border-radius": "100%",
        },
      },
      {
        base: [`[type='checkbox']:focus`],
        class: [".form-checkbox:focus"],
        styles: {
          outline: "2px solid transparent",
          "outline-offset": "2px",
          "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
          "--tw-ring-offset-width": "2px",
          "--tw-ring-offset-color": "#fff",
          "--tw-ring-color": xdColors["xd-primary"]["purple-700"],
          "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
          "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
          "box-shadow": `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
        },
      },
      {
        base: [`[type='radio']:focus`],
        class: [".form-radio:focus"],
        styles: {
          outline: `2px solid ${xdColors["xd-primary"]["purple-700"]}`,
        },
      },
      {
        base: [`[type='checkbox']:checked`],
        class: [".form-checkbox:checked"],
        styles: {
          "background-color": xdColors["xd-secondary-black"].hex,
          "border-color": xdColors["xd-disabled-black"].hex,
          "background-size": `100% 100%`,
          "background-position": `center`,
          "background-repeat": `no-repeat`,
          "background-image": `url("${svgToDataUri(
            `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
          )}")`,
        },
      },
      {
        base: [`[type='radio']:checked`],
        class: [".form-radio:checked"],
        styles: {
          "background-color": xdColors["xd-secondary-black"].hex,
          "border-color": xdColors["xd-disabled-black"].hex,
          "outline-offset": "2px",
          "--tw-ring-offset-width": "2px",
          "--tw-ring-offset-color": "#fff",
          "--tw-ring-inset": "inset",
          "--tw-ring-color": xdColors["xd-secondary-black"].hex,
          "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
          "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
          "box-shadow": `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
        },
      },
      {
        base: [
          `[type='checkbox']:checked:hover`,
          `[type='checkbox']:checked:focus`,
          `[type='radio']:checked:hover`,
          `[type='radio']:checked:focus`,
        ],
        class: [
          ".form-checkbox:checked:hover",
          ".form-checkbox:checked:focus",
          ".form-radio:checked:hover",
          ".form-radio:checked:focus",
        ],
        styles: {
          "background-color": xdColors["xd-secondary-black"].hex,
        },
      },
      {
        base: [`[type='checkbox']:indeterminate`],
        class: [".form-checkbox:indeterminate"],
        styles: {
          "background-image": `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>`
          )}")`,
          "border-color": `transparent`,
          "background-color": `currentColor`,
          "background-size": `100% 100%`,
          "background-position": `center`,
          "background-repeat": `no-repeat`,
        },
      },
      {
        base: [
          `[type='checkbox']:indeterminate:hover`,
          `[type='checkbox']:indeterminate:focus`,
        ],
        class: [
          ".form-checkbox:indeterminate:hover",
          ".form-checkbox:indeterminate:focus",
        ],
        styles: {
          "border-color": "transparent",
          "background-color": "currentColor",
        },
      },
      {
        base: [`[type='file']`],
        class: null,
        styles: {
          background: "unset",
          "border-color": "inherit",
          "border-width": "0",
          "border-radius": "0",
          padding: "0",
          "font-size": "unset",
          "line-height": "inherit",
        },
      },
      {
        base: [`[type='file']:focus`],
        class: null,
        styles: {
          outline: [
            `1px solid ButtonText`,
            `1px auto -webkit-focus-ring-color`,
          ],
        },
      },
      // #endregion inputs
    ]

    const getStrategyRules = (strategy) =>
      rules
        .map((rule) => {
          if (rule[strategy] === null) return null

          return { [rule[strategy]]: rule.styles }
        })
        .filter(Boolean)

    if (strategy.includes("base")) {
      addBase(getStrategyRules("base"))
    }

    if (strategy.includes("class")) {
      addComponents(getStrategyRules("class"))
    }
  }
})

module.exports = XDBaseClass
