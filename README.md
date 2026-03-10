# Multi Rename

> **Fork of [JannisX11/batch-rename](https://github.com/JannisX11/batch-rename).**
> This fork extends the original by adding support for **batch renaming folders** in addition to files.

Rename multiple files and folders at once inside the editor window. That way you can use find/replace and multi-cursor.

### How To Use:
* Select files and/or folders in the explorer sidebar
* Right click one of them and click "Multi Rename"
* Edit the names in the editor
* Hit Save to confirm

![Demo GIF](https://raw.githubusercontent.com/JannisX11/batch-rename/main/media/demo.gif)

### Installation

**From source**

```bash
git clone https://github.com/kanishkbh/multi-rename.git
cd multi-rename
npm install
npx vsce package
code --install-extension multi-rename-extension-*.vsix
```

Reload VS Code after installation.