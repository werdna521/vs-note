// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import format from './format';

export default {
  toReadable(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${format.zero(day, 2)}-${format.zero(month, 2)}-${format.zero(
      year,
      4
    )}`;
  },
};
