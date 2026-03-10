# Mass Rename

> **Fork of [JannisX11/batch-rename](https://github.com/JannisX11/batch-rename).**
> This fork extends the original by adding support for **batch renaming folders** in addition to files.

Rename multiple files and folders at once inside the editor window. That way you can use find/replace and multi-cursor.

### How To Use:
* Select files and/or folders in the explorer sidebar
* Right click one of them and click "Mass Rename"
* Edit the names in the editor
* Hit Save to confirm

![Demo GIF](https://raw.githubusercontent.com/JannisX11/batch-rename/main/media/demo.gif)

### Installation

**From the VS Code Marketplace**

Search for **"Mass Rename"** in the Extensions view (Ctrl+Shift+X), or [install it directly](https://marketplace.visualstudio.com/items?itemName=Kanishk-B.mass-rename-extension).

**From a VSIX file**

1. [Download the latest `.vsix` release](https://github.com/kanishkbh/mass-rename/releases)
2. Open VS Code and go to the Extensions view (Ctrl+Shift+X)
3. Click the **`···`** menu (top-right of the Extensions panel) → **Install from VSIX...**
4. Select the downloaded `.vsix` file
5. Reload VS Code when prompted

**From source**

```bash
git clone https://github.com/kanishkbh/mass-rename.git
cd mass-rename
npm install
npx vsce package
code --install-extension mass-rename-extension-*.vsix
```

Reload VS Code after installation.