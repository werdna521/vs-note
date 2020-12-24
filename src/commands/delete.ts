// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import NoteProvider, { Note } from '../providers/note-provider';
import doc from '../utils/doc';

export default (provider: NoteProvider): Function => (note: Note): void => {
  doc.delete(vscode.Uri.file(note.filepath))
    .then((success: boolean) => {
      if (success) {
        vscode.window.showInformationMessage('Note deleted.');
        provider.refresh();
      } else {
        vscode.window.showErrorMessage('Delete error.');
      }
    });
};
