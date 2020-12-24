// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import NoteProvider from '../providers/note-provider';
import add from './add';
import del from './delete';
import open from './open';
import refresh from './refresh';

interface Command {
  name: string;
  handler: any;
  requireProvider: boolean;
}

const commands: Command[] = [
  {
    name: 'vs-note.add',
    handler: add,
    requireProvider: true,
  },
  {
    name: 'vs-note.delete',
    handler: del,
    requireProvider: true,
  },
  {
    name: 'vs-note.open',
    handler: open,
    requireProvider: false,
  },
  {
    name: 'vs-note.refresh',
    handler: refresh,
    requireProvider: true,
  },
];

export default {
  register(provider: NoteProvider): vscode.Disposable[] {
    return commands.map(({ name, handler, requireProvider }) => {
      return vscode.commands.registerCommand(
        name,
        handler(requireProvider ? provider : null)
      );
    });
  },
};
