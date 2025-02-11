# Smart Clamp

A VS Code extension that generates CSS clamp functions for fluid typography. Convert your font sizes into responsive clamp functions with ease.

> This extension was developed with the assistance of AI (Claude) to help developers create fluid typography more efficiently.

## Features

- 🎯 Generate CSS clamp functions from font sizes
- 📏 Support for multiple units (px, rem, em)
- 👀 Live preview of font sizes at different viewport widths
- ⚙️ Configurable viewport and base font settings
- 🎮 Right-click context menu integration
- ⌨️ Keyboard shortcut support (Ctrl+Shift+C)
- 🔄 Automatic unit conversion
- 📝 Optional input value comments
- ✨ Works with both CSS and SCSS files

## Usage

1. Select two comma-separated values with optional units:

   ```css
   /* All these formats work: */
   16, 24
   16px, 24px
   1rem, 1.5rem
   1em, 1.5em
   ```

2. Trigger Smart Clamp in one of three ways:

   - Use Command Palette: `Smart Clamp`
   - Right-click menu: `Smart Clamp`
   - Keyboard shortcut: `Ctrl+Shift+C` (`Cmd+Shift+C` on Mac)

3. Get a responsive clamp function with calc():

   ```css
   clamp(1rem, calc(0.5vw + 0.75rem), 1.5rem); /* 16px -> 24px (320px -> 1920px) */
   ```

4. Preview the result:
   - Select your values
   - Right-click and choose "Preview Smart Clamp"
   - See how your text looks at different viewport widths

## Configuration

Customize the extension through VS Code settings:

| Setting                         | Description                          | Default |
| ------------------------------- | ------------------------------------ | ------- |
| `smartclamp.mobileScreenWidth`  | Mobile viewport width in pixels      | 320     |
| `smartclamp.desktopScreenWidth` | Desktop viewport width in pixels     | 1920    |
| `smartclamp.remToPxValue`       | Base font size for rem/em conversion | 16      |
| `smartclamp.precision`          | Number of decimal places in output   | 4       |
| `smartclamp.outputFormat`       | Unit to use in output (rem/em)       | rem     |
| `smartclamp.includeComment`     | Include input values as comment      | true    |

## Examples

Input: `16px, 24px` or `1rem, 1.5rem` or `16, 24`

```css
clamp(1rem, calc(0.5vw + 0.75rem), 1.5rem); /* 16px -> 24px (320px -> 1920px) */
```

Input: `20px, 40px` or `1.25rem, 2.5rem`

```css
clamp(1.25rem, calc(1.25vw + 0.625rem), 2.5rem); /* 20px -> 40px (320px -> 1920px) */
```

## Preview Feature

The preview panel shows your text at three viewport widths:

- Mobile width (default: 320px)
- Mid-point width
- Desktop width (default: 1920px)

This helps you visualize how your text will scale across different screen sizes.

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install smartclamp`

## Requirements

- Visual Studio Code version 1.60.0 or higher

## Known Issues

Please report issues on the [GitHub repository](https://github.com/albynbabu97/smartclamp.git).

## Release Notes

### 0.0.1

- Initial release
- Basic clamp function generation
- Multiple unit support (px, rem, em)
- Live preview feature
- Configurable viewport settings
- Keyboard shortcuts and context menu integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This extension was developed with the assistance of Claude AI to help developers create fluid typography more efficiently.

## License

This extension is licensed under the [MIT License](LICENSE).
