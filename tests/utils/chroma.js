'use strict';

const MODES = [
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'blinking',
  '', // to maintain monomorphic array
  'inverse',
  'hidden',
  'strikethrough',
];

const COLORS = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  '', // to maintain monomorphic array
  'default',
];

const ANSI_RESET = '0m';

const esc = (graphics, string) =>
  `\x1b[${graphics}m${string}\x1b[${ANSI_RESET}`;

const stylize = (styles, string) => {
  const list = styles.split(' ');
  const graphics = [];
  for (const style of list) {
    if (MODES.includes(style)) {
      const code = MODES.indexOf(style);
      graphics.push(code);
      continue;
    }
    const [foreground, background] = style.split('/');
    if (COLORS.includes(foreground)) {
      const foregroundCode = (30 + COLORS.indexOf(foreground)).toString();
      graphics.push(foregroundCode);
      if (background && COLORS.includes(background)) {
        const backgroundCode = (40 + COLORS.indexOf(background)).toString();
        graphics.push(backgroundCode);
      }
    }
  }
  const codes = graphics.join(';');
  return esc(codes, string);
};

const tag = (regular, special) =>
  (strings, ...values) => {
    const output = strings.reduce((acc, string, index) => {
      const value = values[index];
      acc.push(
        stylize(regular, string),
        value ? stylize(special, value) : '',
      );
      return acc;
    }, []);
    return output.join('');
  };

module.exports = {
  chroma: stylize,
  tag,
};
