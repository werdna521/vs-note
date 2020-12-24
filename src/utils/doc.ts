// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';

const getEdit = (): vscode.WorkspaceEdit => new vscode.WorkspaceEdit();

export default {
  createFile(path: vscode.Uri): Thenable<boolean> {
    const edit = getEdit();
    edit.createFile(
      path,
      {
        overwrite: false,
      },
      {
        label: path.fsPath,
        needsConfirmation: false,
      }
    );
    return vscode.workspace.applyEdit(edit);
  },
  insert(path: vscode.Uri, content: string): Thenable<boolean> {
    const edit = getEdit();
    edit.insert(path, new vscode.Position(0, 0), content);
    return vscode.workspace.applyEdit(edit);
  },
  open(path: vscode.Uri): Thenable<void> {
    return vscode.workspace
      .openTextDocument(path)
      .then((doc: vscode.TextDocument) => {
        vscode.window.showTextDocument(doc, 1, false);
      });
  },
};
