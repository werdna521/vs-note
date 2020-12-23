// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration('vs-note');

export default {
  getLocation(): string {
    return config.get<string>('location') || '';
  },
  updateLocation(location: string): Thenable<void> {
    return config.update('location', location);
  },
};
