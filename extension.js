const vscode = require("vscode");

// Helper function to clean input values and convert to pixels
function cleanFontSize(value, remToPx = 16) {
  // Remove whitespace and convert to lowercase
  value = value.trim().toLowerCase();

  // Extract number and unit
  const match = value.match(/^([\d.]+)(px|rem|em)?$/);
  if (!match) return value;

  const [, number, unit] = match;
  const numValue = parseFloat(number);

  // Convert to pixels based on unit
  switch (unit) {
    case "rem":
      return (numValue * remToPx).toString();
    case "em":
      return (numValue * remToPx).toString();
    case "px":
    default:
      return numValue.toString();
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "smartclamp.generateClamp",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (!text) {
        vscode.window.showErrorMessage(
          "Please select the comma-separated values for mobile and desktop font sizes"
        );
        return;
      }

      try {
        // Get configuration values
        const config = vscode.workspace.getConfiguration("smartclamp");
        const mobileWidth = config.get("mobileScreenWidth");
        const desktopWidth = config.get("desktopScreenWidth");
        const remToPx = config.get("remToPxValue");

        // Clean and parse input values with remToPx value
        const [mobileFontSize, desktopFontSize] = text
          .split(",")
          .map((val) => parseFloat(cleanFontSize(val, remToPx)));

        if ([mobileFontSize, desktopFontSize].some(isNaN)) {
          throw new Error("Invalid input values");
        }

        const slope =
          (desktopFontSize - mobileFontSize) / (desktopWidth - mobileWidth);
        const yIntercept = mobileFontSize - slope * mobileWidth;

        // Convert pixel values to rem
        const mobileRem = mobileFontSize / remToPx;
        const desktopRem = desktopFontSize / remToPx;

        // Calculate the preferred value using the slope formula
        const slopeVw = (slope * 100).toFixed(6); // Convert to vw units
        const preferredValue = `calc(${Number(slopeVw)}vw + ${Number(
          (yIntercept / remToPx).toFixed(6)
        )}rem)`;

        // Generate the clamp function with brief comment
        const clampFunction = `clamp(${Number(
          mobileRem.toFixed(4)
        )}rem, ${preferredValue}, ${Number(
          desktopRem.toFixed(4)
        )}rem); /* ${mobileFontSize}px -> ${desktopFontSize}px (${mobileWidth}px -> ${desktopWidth}px */`;

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, clampFunction);
        });
      } catch (error) {
        vscode.window.showErrorMessage(
          "Invalid input. Please provide 2 comma-separated numbers: mobile font size and desktop font size"
        );
      }
    }
  );

  let previewDisposable = vscode.commands.registerCommand(
    "smartclamp.previewClamp",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      try {
        // Get configuration values
        const config = vscode.workspace.getConfiguration("smartclamp");
        const mobileWidth = config.get("mobileScreenWidth");
        const desktopWidth = config.get("desktopScreenWidth");
        const remToPx = config.get("remToPxValue");

        // Clean and parse input values
        const [mobileFontSize, desktopFontSize] = text
          .split(",")
          .map((val) => parseFloat(cleanFontSize(val)));

        if ([mobileFontSize, desktopFontSize].some(isNaN)) {
          throw new Error("Invalid input values");
        }

        // Calculate font sizes at different viewport widths
        const viewports = [
          mobileWidth,
          (mobileWidth + desktopWidth) / 2,
          desktopWidth,
        ];

        const slope =
          (desktopFontSize - mobileFontSize) / (desktopWidth - mobileWidth);
        const yIntercept = mobileFontSize - slope * mobileWidth;

        const previewSizes = viewports.map((width) => {
          const fontSize = slope * width + yIntercept;
          const clampedSize = Math.min(
            Math.max(fontSize, mobileFontSize),
            desktopFontSize
          );
          return {
            viewport: width,
            fontSize: clampedSize.toFixed(2),
          };
        });

        // Create preview panel
        const panel = vscode.window.createWebviewPanel(
          "clampPreview",
          "Smart Clamp Preview",
          vscode.ViewColumn.Beside,
          {}
        );

        // Generate HTML content
        panel.webview.html = getPreviewHtml(
          previewSizes,
          mobileFontSize,
          desktopFontSize
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          "Invalid input. Please provide 2 comma-separated numbers: mobile font size and desktop font size"
        );
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(previewDisposable);
}

function getPreviewHtml(sizes, minSize, maxSize) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: system-ui; padding: 20px; }
        .preview-item {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .info { color: #666; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <h2>Font Size Preview</h2>
      <div class="info">Min: ${minSize}px | Max: ${maxSize}px</div>
      ${sizes
        .map(
          (size) => `
        <div class="preview-item">
          <div class="info">At ${size.viewport}px viewport width:</div>
          <div style="font-size: ${size.fontSize}px">
            The quick brown fox jumps over the lazy dog (${size.fontSize}px)
          </div>
        </div>
      `
        )
        .join("")}
    </body>
    </html>
  `;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
