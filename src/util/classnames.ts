export const classnames = (...list: Array<string | null | undefined | false>) => list
.filter((value) => Boolean(value))
.join(' ');
