// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import NoteProvider from './providers/note-provider';
import commands from './commands';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vs-note" is now active!');

  const noteProvider = new NoteProvider();
  vscode.window.registerTreeDataProvider('notes', noteProvider);

  const disposables = commands.register(noteProvider);
  context.subscriptions.push(...disposables);
}

export function deactivate() {}
