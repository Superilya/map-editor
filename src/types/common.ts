export type ThenArg<T> = T extends Promise<infer U>
    ? U
    : T extends (...args: any[]) => Promise<infer U>
        ? U
        : T;

/**
 * Выводит union тип всех значений T.
 */
export type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;
