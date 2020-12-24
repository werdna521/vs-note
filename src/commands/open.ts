// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as vscode from 'vscode';
import doc from '../utils/doc';

export default (): Function => (file: string): void => {
  doc.open(vscode.Uri.file(file));
};
