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
import config from '../utils/config';
import fs from '../utils/fs';
import prompt from '../utils/prompt';

export default class NoteProvider implements vscode.TreeDataProvider<Note> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    Note | undefined | null | void
  >;
  readonly onDidChangeTreeData: vscode.Event<Note | undefined | null | void>;
  private location: string;

  constructor() {
    this.location = config.getLocation();
    this._onDidChangeTreeData = new vscode.EventEmitter<
      Note | undefined | null | void
    >();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh(): void {
    this.refreshLocation();
    this._onDidChangeTreeData.fire();
  }

  refreshLocation(): void {
    this.location = config.getLocation();
  }

  getTreeItem(element: Note): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Note): Thenable<Note[]> {
    if (!element) {
      return Promise.resolve(this.getNotes());
    }
    return Promise.resolve([]);
  }

  private getNotes(): Note[] | Thenable<Note[]> {
    if (!fs.pathExists(this.location!)) {
      return prompt.promptForLocation().then(() => []);
    }

    if (fs.isDirectory(this.location!)) {
      const files = fs.getFiles(this.location!);

      return files.map(filename => {
        return new Note(filename);
      });
    }

    return [];
  }
}

class Note extends vscode.TreeItem {
  constructor(public readonly label: string) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = `${this.label}`;
    this.description = 'note';
  }
}
