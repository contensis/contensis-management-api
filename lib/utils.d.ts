export type Optional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, K>;
export declare const isString: (value: unknown) => value is string;
