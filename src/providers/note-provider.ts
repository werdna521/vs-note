// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import * as path from 'path';
import config from '../utils/config';
import datetime from '../utils/datetime';
import format from '../utils/format';
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
        return new Note(
          format.note(filename),
          path.join(this.location, filename),
          new Date()
        );
      });
    }

    return [];
  }
}

class Note extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly filepath: string,
    public readonly date: Date
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = `${this.label}`;
    this.description = datetime.toReadable(this.date);
    this.command = {
      command: 'vs-note.open',
      title: 'Open Note',
      arguments: [this.filepath],
    };
  }

  iconPath = {
    dark: path.join(__filename, '..', '..', 'media', 'dark', 'writing.svg'),
    light: path.join(__filename, '..', '..', 'media', 'light', 'writing.svg'),
  };
}
