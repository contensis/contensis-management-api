// Make specific members of an object optional and union the others
export type Optional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Pick<Partial<T>, K>;
