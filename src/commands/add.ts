// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import NoteProvider from '../providers/note-provider';
import config from '../utils/config';
import doc from '../utils/doc';
import random from '../utils/random';

const header = (title?: string) => `== ${title} ==\n`;

export default (provider: NoteProvider): Function => (): void => {
  vscode.window
    .showInputBox({
      placeHolder: 'My Note',
      prompt: 'Title of your note',
    })
    .then(
      (value?: string) => {
        if (value) {
          const path: vscode.Uri = vscode.Uri.file(
            `${config.getLocation()}/${random.id()}-${value}.notes`
          );
          doc
            .createFile(path)
            .then((success: boolean) => {
              if (success) {
                return doc.insert(path, header(value));
              }
            })
            .then((success?: boolean) => {
              if (success) {
                provider.refresh();
                return doc.open(path);
              } else {
                vscode.window.showErrorMessage(
                  'Note existed. Please delete the note if you want to overwrite the old one.'
                );
              }
            });
        }
      },
      (reason: any) => {}
    );
};
