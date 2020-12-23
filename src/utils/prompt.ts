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
