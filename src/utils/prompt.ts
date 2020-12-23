// Copyright 2020 Andrew Cen
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as vscode from 'vscode';
import config from './config';

const showInfo = (
  info: string,
  ...actions: string[]
): Thenable<string | undefined> => {
  return vscode.window.showInformationMessage(info, ...actions);
};

const openDialog = (title: string) => {
  return vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    title,
  });
};

export default {
  promptForLocation(): Thenable<void> {
    return showInfo('Please select where to store your notes', 'Select')
      .then(selection => {
        if (selection === 'Select') {
          return openDialog('Select where to store notes');
        }
      })
      .then(dirs => {
        if (dirs) {
          return config.updateLocation(dirs[0].path);
        }
      });
  },
};
