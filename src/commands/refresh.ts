// Copyright (c) 2020 Andrew Cen
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import NoteProvider from '../providers/note-provider';

export default (provider: NoteProvider): Function => (): void => {
  provider.refresh();
};
