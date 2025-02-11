const vscode = require("vscode");

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

        // Now we only need two values from the selection: mobile and desktop font sizes
        const [mobileFontSize, desktopFontSize] = text
          .split(",")
          .map((val) => parseFloat(val.trim()));

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
        const preferredValue = `${Number(slopeVw)}vw + ${Number(
          (yIntercept / remToPx).toFixed(6)
        )}rem`;

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

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
