import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration('vs-note');

export default {
  getLocation(): string {
    return config.get<string>('location') || '';
  },
  async updateLocation(location: string): Promise<void> {
    await config.update('location', location);
  }
};
