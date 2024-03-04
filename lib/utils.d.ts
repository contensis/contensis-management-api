export declare type Optional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, K>;
