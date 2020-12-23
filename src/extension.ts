// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import NoteProvider from './providers/note-provider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vs-note" is now active!');

  const noteProvider = new NoteProvider();
  vscode.window.registerTreeDataProvider('notes', noteProvider);

  let disposable = [
    vscode.commands.registerCommand('vs-note.refresh', () => {
      noteProvider.refresh();
    }),
    vscode.commands.registerCommand('vs-note.add', () => {
      vscode.window.showInformationMessage('Adding :)');
    }),
    vscode.commands.registerCommand('vs-note.open', (file: string) => {
      vscode.workspace
        .openTextDocument(file)
        .then((doc: vscode.TextDocument) => {
          vscode.window.showTextDocument(doc, 1, false);
        });
    }),
  ];

  context.subscriptions.push(...disposable);
}

export function deactivate() {}
