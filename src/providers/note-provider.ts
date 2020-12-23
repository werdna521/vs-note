import * as vscode from 'vscode';
import * as fs from 'fs';

export default class NoteProvider implements vscode.TreeDataProvider<Note> {
  private _onDidChangeTreeData:
    vscode.EventEmitter<Note | undefined | null | void>;
  readonly onDidChangeTreeData: vscode.Event<Note | undefined | null | void>;
  private location?: string;

  constructor() {
    this.refreshLocation();
    this._onDidChangeTreeData = 
      new vscode.EventEmitter<Note | undefined | null | void>();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  refresh(): void {
    this.refreshLocation();
    this._onDidChangeTreeData.fire();
  }

  refreshLocation(): void {
    this.location = vscode.workspace.getConfiguration('vs-note')
      .get('location') || '';
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
    if (!this.pathExists(this.location!)) {
      return vscode.window.showInformationMessage(
        'Please select where to store your notes',
        'Select'
      )
        .then(selection => {
          if (selection === 'Select') {
            return vscode.window.showOpenDialog({
              canSelectFiles: false,
              canSelectFolders: true,
              canSelectMany: false,
              title: 'Select where to store notes'
            });
          }
        })
        .then(dirs => {
          if (dirs) {
            return vscode.workspace.getConfiguration('vs-note')
              .update('location', dirs[0].path.slice(1), true);
          }
        })
        .then(() => {
          this.refresh();
          return [];
        });
    }

    if (this.isDirectory(this.location!)) {
      const files = fs.readdirSync(this.location!);

      return files.map(filename => {
        return new Note(filename, vscode.TreeItemCollapsibleState.None);
      });
    }
    return [];
  }

  private isDirectory(p: string): boolean {
    return fs.lstatSync(p).isDirectory();
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
