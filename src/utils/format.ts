// Copyright (c) 2020 Andrew Cen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const generateZeros = (n: number): string =>
  Array.from({ length: n }, () => {})
    .map(() => '0')
    .join('');

export default {
  zero(value: number, precedingZeros: number): string {
    const length = value.toString().length;
    return `${generateZeros(length - precedingZeros)}${value}`;
  },
  note(value: string): string {
    const filename = value.split('-').slice(1).join('');
    const chunks = filename.split('.');
    return chunks.slice(0, chunks.length-1).join('');
  },
};
