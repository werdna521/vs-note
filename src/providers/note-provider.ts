// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
