# Smart Clamp

A VS Code extension that generates CSS clamp functions for fluid typography. Convert your font sizes into responsive clamp functions with ease.

## Features

- 🎯 Generate CSS clamp functions from font sizes
- ⚙️ Configurable viewport and base font settings
- 🎮 Right-click context menu integration
- ⌨️ Keyboard shortcut support (Ctrl+Shift+C)
- 🔄 Automatic rem/em conversion
- 📝 Optional input value comments

## Usage

1. Select two comma-separated numbers (mobile font size, desktop font size)
   Example: `16, 24`

2. Trigger Smart Clamp in one of three ways:

   - Use Command Palette: `Smart Clamp`
   - Right-click menu: `Smart Clamp`
   - Keyboard shortcut: `Ctrl+Shift+C` (`Cmd+Shift+C` on Mac)

3. Get a responsive clamp function:
   ```css
   clamp(1rem, 0.5vw + 0.75rem, 1.5rem); /* 16px -> 24px (320px -> 1920px) */
   ```

## Configuration

Customize the extension through VS Code settings:

| Setting                         | Description                        | Default |
| ------------------------------- | ---------------------------------- | ------- |
| `smartclamp.mobileScreenWidth`  | Mobile viewport width in pixels    | 320     |
| `smartclamp.desktopScreenWidth` | Desktop viewport width in pixels   | 1920    |
| `smartclamp.remToPxValue`       | Base font size for rem conversion  | 16      |
| `smartclamp.precision`          | Number of decimal places in output | 4       |
| `smartclamp.outputFormat`       | Unit to use in output (rem/em)     | rem     |
| `smartclamp.includeComment`     | Include input values as comment    | true    |

## Examples

Input: `16, 24`
Output: `clamp(1rem, 0.5vw + 0.75rem, 1.5rem); /* 16px -> 24px (320px -> 1920px) */`

Input: `16, 24`
Output: `clamp(1rem, 0.5vw + 0.75rem, 1.5rem); /* 16px -> 24px (320px -> 1920px) */`

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install smartclamp`

## Requirements

- Visual Studio Code version 1.60.0 or higher

## Known Issues

Please report issues on the [GitHub repository](your-repo-url).

## Release Notes

### 0.0.1

- Initial release
- Basic clamp function generation
- Configurable viewport settings
- Keyboard shortcuts and context menu integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).
