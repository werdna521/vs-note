// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as fs from 'fs';

export default {
  pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
  },
  isDirectory(p: string): boolean {
    return fs.lstatSync(p).isDirectory();
  },
  getFiles(p: string): string[] {
    return fs.readdirSync(p);
  }
};
