// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import NoteProvider, { Note } from '../providers/note-provider';

export default (provider: NoteProvider): Function => (note: Note): void => {
  vscode.window.showInformationMessage(note.label);
};
