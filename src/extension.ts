// Copyright 2020 Andrew Cen
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as vscode from 'vscode';
import NoteProvider from './providers/note-provider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vs-note" is now active!');

  const noteProvider = new NoteProvider();
  vscode.window.registerTreeDataProvider('notes', noteProvider);

  let disposable = vscode.commands.registerCommand('vs-note.refresh', () => {
    noteProvider.refresh();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
