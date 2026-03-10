'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

interface RenameFile {
    fsPath: string;
    basename: string;
    basepath: string;
}

interface Renaming {
    files: RenameFile[];
    doc?: vscode.TextDocument;
    save?: () => void;
}

export function activate(context: vscode.ExtensionContext) {
    let current_renaming: Renaming | undefined;

    const disposableRenameCommand = vscode.commands.registerCommand('extension.multiRename', (_clicked_file, selected_files: vscode.Uri[]) => {
        if (!selected_files) return;

        current_renaming = { files: [] };

        selected_files.forEach(file => {
            const basename = path.basename(file.fsPath);
            const basepath = path.dirname(file.fsPath) + path.sep;
            current_renaming!.files.push({ fsPath: file.fsPath, basename, basepath });
        });

        const batchFilePath = path.join(os.tmpdir(), '.multi-rename.txt');
        const content = current_renaming.files.map(file => file.basename).join('\n');
        fs.writeFileSync(batchFilePath, content);

        const openPath = vscode.Uri.file(batchFilePath);

        vscode.workspace.openTextDocument(openPath).then(doc => {
            current_renaming!.doc = doc;
            vscode.window.showTextDocument(doc);

            current_renaming!.save = function () {
                const new_names = doc.getText().split(/[\r\n]+/).filter(line => !!line);

                if (current_renaming!.files.length === new_names.length) {
                    current_renaming!.files.forEach((file, i) => {
                        let num = 1;
                        let new_path = file.basepath + new_names[i];
                        if (file.fsPath === new_path) return;

                        while (fs.existsSync(new_path)) {
                            new_path = file.basepath + new_names[i].replace(/\.(?=[A-Za-z0-9]*$)/, `_${num}.`);
                            num++;
                        }

                        fs.renameSync(file.fsPath, new_path);
                    });
                } else {
                    vscode.window.showInformationMessage('The line count does not match the file selection!');
                }

                setTimeout(() => {
                    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                    fs.unlink(batchFilePath, (err) => {
                        if (err) { console.error(err); }
                    });
                }, 80);
            };
        });
    });

    vscode.workspace.onWillSaveTextDocument((save_event) => {
        if (current_renaming?.doc && save_event.document === current_renaming.doc && save_event.reason === 1) {
            current_renaming.save?.();
        }
    });

    context.subscriptions.push(disposableRenameCommand);
}

// This method is called when extension is deactivated
export function deactivate() {}

