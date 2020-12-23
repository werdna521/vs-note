import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export default class NoteProvider implements vscode.TreeDataProvider<Note> {
  constructor(private noteRoot: string) {}

  getTreeItem(element: Note): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Note): Thenable<Note[]> {
    if (!this.noteRoot) {
      vscode.window.showInformationMessage('Root note not set');
      return Promise.resolve([]);
    }

    return Promise.resolve(this.getNotes());
  }
  
  private getNotes(): Note[] {
    if (this.pathExists(this.noteRoot) && this.isDirectory(this.noteRoot)) {
      const files = fs.readdirSync(this.noteRoot);

      return files.map(filename => {
        return new Note(filename, vscode.TreeItemCollapsibleState.None);
      });
    }

    return [];
  }

  private isDirectory(p: string): boolean {
    return fs.lstatSync(this.noteRoot).isDirectory();
  }

  private pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
  }
}

class Note extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
    this.description = 'note';
  }
}
