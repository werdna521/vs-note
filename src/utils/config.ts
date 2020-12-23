import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration('vs-note');

export default {
  getLocation(): string {
    return config.get<string>('location') || '';
  },
  updateLocation(location: string): Thenable<void> {
    return config.update('location', location);
  }
};
